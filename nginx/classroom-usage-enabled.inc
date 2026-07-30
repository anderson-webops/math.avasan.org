if ($request_method != POST) {
	return 405;
}

if ($http_x_classroom_request != "1") {
	return 403;
}

if ($http_origin != "https://math.avasan.org") {
	return 403;
}

if ($http_sec_fetch_site != "same-origin") {
	return 403;
}

if ($http_content_type != "application/json") {
	return 415;
}

if ($args != "") {
	return 400;
}

access_log off;
client_max_body_size 2k;

# Resolve only when a usage request arrives. A temporary DNS or CS outage must
# not prevent this static Math site from starting.
resolver 127.0.0.11 valid=30s ipv6=off;
resolver_timeout 2s;
set $classroom_usage_origin https://cs.avasan.org;
proxy_pass $classroom_usage_origin/api/classroom-usage;

proxy_http_version 1.1;
proxy_connect_timeout 2s;
proxy_send_timeout 3s;
proxy_read_timeout 3s;
proxy_next_upstream off;

proxy_ssl_server_name on;
proxy_ssl_name cs.avasan.org;
proxy_ssl_verify on;
proxy_ssl_verify_depth 3;
proxy_ssl_trusted_certificate /etc/ssl/certs/ca-certificates.crt;

# Start from an empty header set, then add only the fixed fields the aggregate
# endpoint needs. No browser or network identity crosses the proxy boundary.
proxy_pass_request_headers off;
proxy_set_header Host "cs.avasan.org";
proxy_set_header Content-Type "application/json";
proxy_set_header X-Classroom-Request "1";
proxy_set_header Origin "https://math.avasan.org";
proxy_set_header Authorization "";
proxy_set_header Cookie "";
proxy_set_header Proxy-Authorization "";
proxy_set_header Referer "";
proxy_set_header X-Forwarded-For "";
proxy_set_header X-Forwarded-Host "";
proxy_set_header X-Forwarded-Proto "";
proxy_set_header X-Real-IP "";
proxy_set_header X-Classroom-Analytics-Key "";
proxy_hide_header Set-Cookie;
proxy_pass_request_body on;

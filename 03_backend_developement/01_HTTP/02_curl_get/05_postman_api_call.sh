myDate="$(date +%Y-%m-%d)";curl -X GET "https://postman-echo.com/time/valid?timestamp=${myDate}" > 05_postman_api_call.result

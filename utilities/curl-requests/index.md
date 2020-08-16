# cURL Request Boilerplates
## Please note that some fields must be modified to your specifications.

#### "Get Started" Button
curl -X POST -H "Content-Type: application/json" -d '{
  "get_started": {
    "payload": "Home"
  }
}' "https://graph.facebook.com/v8.0/me/messenger_profile?access_token=<PAGE_ACCESS_TOKEN>"

#### Creating page label for Broadcast API
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "<LABEL_NAME>",
}' "https://graph.facebook.com/v2.11/me/custom_labels?access_token=<PAGE_ACCESS_TOKEN>"


#### Delete Properties (Persistent Menu)
curl -X DELETE -H "Content-Type: application/json" -d '{
  "fields": [
    "persistent_menu"
  ]
}' "https://graph.facebook.com/v4.0/me/messenger_profile?access_token=<PAGE_ACCESS_TOKEN>"
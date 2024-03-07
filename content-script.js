// Define a list of regular expressions to match various sensitive keys and tokens in the code
const KEY_PATTERNS = [
// Each pattern is designed to capture different types of API keys and tokens
// For example, Adobe client secrets, AWS access keys, Google OAuth tokens, etc.
// The patterns look for a keyword followed by an assignment and then capture the actual key or token value
    /adobe_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adafruit_io_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adobe_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adobe_device_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adobe_pac_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adobe_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adobe_service_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /adobe_short_lived_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aiven_auth_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aiven_service_password[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /alibaba_cloud_access_key_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /alibaba_cloud_access_key_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /amazon_oauth_client_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /amazon_oauth_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aws_access_key_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aws_secret_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aws_session_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aws_temporary_access_key_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /aws_secret_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /anthropic_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /asana_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /atlassian_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /atlassian_jwt[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /bitbucket_server_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /authress_service_client_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_active_directory_application_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_batch_key_identifiable[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_cache_for_redis_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_container_registry_key_identifiable[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_cosmosdb_key_identifiable[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_devops_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_function_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_ml_web_service_classic_identifiable_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_sas_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_search_admin_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_search_query_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_management_certificate[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_sql_connection_string[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_sql_password[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /azure_storage_account_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /baiducloud_api_accesskey[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /beamer_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /cds_canada_notify_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /canva_connect_api_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /Cashfree API Key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /checkout_production_secret_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /checkout_test_secret_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /chief_tools_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /clojars_deploy_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /codeship_credential[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /contentful_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /CONTRIBUTED_SYSTEMS_CREDENTIALS[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /cratesio_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /databricks_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /DATADOG_API_KEY[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /defined_networking_nebula_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /devcycle_client_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /devcycle_mobile_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /devcycle_server_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /digitalocean_oauth_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /digitalocean_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /digitalocean_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /digitalocean_system_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /discord_api_token_v2[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /discord_bot_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /docker_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /doppler_audit_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /doppler_cli_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /doppler_personal_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /doppler_scim_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /doppler_service_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /doppler_service_account_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /dropbox_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /dropbox_short_lived_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /duffel_live_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /duffel_test_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /dynatrace_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /dynatrace_internal_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /easypost_production_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /easypost_test_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /ebay_production_client_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /ebay_production_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /ebay_sandbox_client_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /ebay_sandbox_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /fastly_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /figma_pat[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /finicity_app_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /flutterwave_live_api_secret_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /flutterwave_test_api_secret_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /frameio_developer_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /frameio_jwt[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /fullstory_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /github_app_installation_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /github_oauth_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /github_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /github_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /github_ssh_private_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /gitlab_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /gocardless_live_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /gocardless_sandbox_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /firebase_cloud_messaging_server_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_cloud_storage_service_account_access_key_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_cloud_storage_access_key_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_cloud_storage_user_access_key_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_cloud_storage_access_key_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_oauth_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_oauth_client_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_oauth_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_oauth_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /google_cloud_private_key_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /grafana_cloud_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /grafana_cloud_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /grafana_project_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /grafana_project_service_account_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hashicorp_vault_batch_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hashicorp_vault_root_service_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hashicorp_vault_service_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /terraform_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /highnote_rk_live_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /highnote_rk_test_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /highnote_sk_live_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /highnote_sk_test_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hop_bearer[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hop_pat[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hop_ptk[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hubspot_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /hubspot_api_personal_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /intercom_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /ionic_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /ionic_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /jd_cloud_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /jfrog_platform_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /jfrog_platform_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /jfrog_platform_reference_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /linear_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /linear_oauth_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /lob_live_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /lob_test_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /localstack_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /logicmonitor_bearer_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /logicmonitor_lmv1_access_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /mailchimp_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /MANDRILL_API[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /mailgun_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /mapbox_secret_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /maxmind_license_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /mercury_non_production_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /mercury_production_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /messagebird_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /facebook_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /midtrans_production_server_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /midtrans_sandbox_server_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /new_relic_insights_query_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /new_relic_license_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /new_relic_personal_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /new_relic_rest_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /notion_integration_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /notion_oauth_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /npm_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /nuget_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /octopus_deploy_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /oculus_very_tiny_encrypted_session[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onechronos_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onechronos_eb_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onechronos_eb_encryption_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onechronos_oauth_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onechronos_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onfido_live_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /onfido_sandbox_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /openai_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /openai_api_key_v2[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /palantir_jwt[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /persona_production_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /persona_sandbox_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /pinterest_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /pinterest_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /planetscale_database_password[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /planetscale_oauth_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /planetscale_service_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /plivo_auth_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /plivo_auth_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /postman_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /postman_collection_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /prefect_server_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /prefect_user_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /PREFECT_USER_API_TOKEN[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /proctorio_consumer_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /proctorio_linkage_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /proctorio_registration_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /proctorio_secret_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /pulumi_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /pypi_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /readmeio_api_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /redirect_pizza_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /rootly_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /rubygems_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /samsara_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /samsara_oauth_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /segment_public_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /sendgrid_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /sendinblue_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /sendinblue_smtp_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shippo_live_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shippo_test_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_app_client_credentials[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_app_client_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_app_shared_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_custom_app_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_marketplace_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_merchant_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_partner_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /shopify_private_app_password[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /slack_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /slack_incoming_webhook_url[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /slack_workflow_webhook_url[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /square_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /square_production_application_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /square_sandbox_application_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /sslmate_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /sslmate_cluster_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /stripe_live_restricted_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /stripe_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /stripe_legacy_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /stripe_test_restricted_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /stripe_test_secret_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /stripe_webhook_signing_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /supabase_service_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /tableau_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /telegram_bot_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /telnyx_api_v2_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /tencent_cloud_secret_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /tencent_wechat_api_app_id[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /twilio_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /twilio_account_sid[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /twilio_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /typeform_personal_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /wiseflow_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /wakatime_pp_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /wakatime_oauth_access_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /wakatime_oauth_refresh_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /workato_developer_api_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /workos_production_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /workos_staging_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_iam_access_secret[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_cloud_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_cloud_iam_cookie[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_cloud_iam_token[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_cloud_smartcaptcha_server_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_dictionary_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /YANDEX_PASSPORT_OAUTH_TOKEN[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_predictor_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /yandex_translate_api_key[:=]\s*['"]?([^'"\s]+)['"]?/i,
    /zuplo_consumer_api_key[:=]\s*['"]?(\w+)['"]?/
];

// Function to apply CSS styles to a given element. Takes an element and a styles object as arguments.
function applyStyles(element, styles) {
  Object.keys(styles).forEach(key => {
    element.style[key] = styles[key];
  });
}

// Function to show a modal dialog on the webpage. It displays a security alert when sensitive information is detected.
function showModal(message, variableName) {
  // Prevent creating multiple modals
  if (document.getElementById('customModal')) return;

  // Create and style the modal container
  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'customModal');
  applyStyles(modalContainer, {
    // CSS styles for positioning, sizing, and appearance of the modal
    position: 'fixed', zIndex: '10000', left: '0', top: '0', width: '100%',
    height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', animation: 'fadeIn 0.5s'
  });

  const modalContent = document.createElement('div');
  applyStyles(modalContent, {
    margin: '15% auto', padding: '20px', width: '90%', maxWidth: '450px',
    backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'scaleIn 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center'
  });

  // Add alert text and detailed message to the modal
  const alertText = document.createElement('p');
  alertText.innerHTML = '<strong>SECURITY ALERT</strong>';
  applyStyles(alertText, { textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' });
  
  const detailedText = document.createElement('p');
  detailedText.innerHTML = `${message} <strong>${variableName}</strong>`;
  applyStyles(detailedText, { textAlign: 'center' });

  // Create and style the close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.setAttribute('aria-label', 'Close alert dialog');
  applyStyles(closeButton, {
    cursor: 'pointer', marginTop: '20px', padding: '10px 20px', border: 'none',
    backgroundColor: '#007BFF', color: 'white', borderRadius: '5px'
  });
  closeButton.onmouseover = () => (closeButton.style.opacity = '0.8');
  closeButton.onmouseleave = () => (closeButton.style.opacity = '1');
  closeButton.onclick = () => {
    modalContainer.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => modalContainer.remove(), 500);
  };

  // Assemble the modal components and add them to the document
  modalContent.append(alertText, detailedText, closeButton);
  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);
}

// Function to process text input, search for sensitive information, and mask it if found
function processInputText(text, element) {
  let modified = false;
  let detectedVariableName = '';
  KEY_PATTERNS.forEach((pattern) => {
    const match = pattern.exec(text);
    if (match?.[1]) {
      modified = true;
      // Assuming the regex pattern is correct and captures the variable name as intended
      detectedVariableName = match[0].match(/(\w+)/)[0];
      text = text.replace(new RegExp(match[1], 'gi'), '####NOLEAK####');
    }
  });
  if (modified) {
    // Using optional chaining to simplify null/undefined checks
    if (element?.isContentEditable) {
      element.textContent = text;
    } else {
      element.value = text;
    }
    // Show the modal with the detected variable name
    showModal('Detected and masked sensitive information for variable', detectedVariableName);
  }
}

// Event listener to check input elements for sensitive information dynamically
document.addEventListener('input', (event) => {
  const target = event.target; // 'target' es definido aquí dentro de la función
  if (target.matches('input, textarea') || target.isContentEditable) { // Comprobación para 'input', 'textarea' y contenido editable
    let textContent = target.isContentEditable ? target.textContent : target.value; // Obtiene el texto del contenido editable o el valor del input
    processInputText(textContent, target); // Llama a la función con el texto y el elemento objetivo
  }
});

// Function to add listeners to input, textarea, and contenteditable elements for real-time monitoring
function addListeners() {
  document.querySelectorAll('input, textarea, [contenteditable="true"]').forEach(element => {
    element.addEventListener('input', (event) => {
      const target = event.target;
      let textContent = target.isContentEditable ? target.textContent : target.value;
      processInputText(textContent, target);
    });
  });
}

// Setup a MutationObserver to monitor DOM changes and add event listeners to new elements dynamically
const mainObserver = new MutationObserver(() => {
  addListeners();
});

// Start observing the body for changes to child elements and subtree modifications
mainObserver.observe(document.body, { childList: true, subtree: true });

// Initialize by adding listeners to existing elements
addListeners();

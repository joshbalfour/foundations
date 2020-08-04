/**
 * TODO: will refactor this to separate DEVELOPER PORTAL ACTIONS, CLIENT AND ADMIN
 * by <<PORTAL_NAME>>_<<ACTION NAME>>
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // Apps Actions
  FETCH_APP_LIST: 'FETCH_APP_LIST',
  FETCH_APP_LIST_SUCCESS: 'FETCH_APP_LIST_SUCCESS',
  FETCH_APP_LIST_FAILED: 'FETCH_APP_LIST_FAILED',
  CLEAR_APP_LIST: 'CLEAR_APP_LIST',

  FETCH_APP_DETAIL: 'FETCH_APP_DETAIL',
  FETCH_APP_DETAIL_SUCCESS: 'FETCH_APP_DETAIL_SUCCESS',
  FETCH_APP_DETAIL_FAILED: 'FETCH_APP_DETAIL_FAILED',
  CLEAR_APP_DETAIL: 'CLEAR_APP_DETAIL',

  CREATE_APP: 'CREATE_APP',
  CREATE_APP_SUCCESS: 'CREATE_APP_SUCCESS',
  CREATE_APP_FAILED: 'CREATE_APP_FAILED',

  DELETE_APP: 'DELETE_APP',
  DELETE_APP_SUCCESS: 'DELETE_APP_SUCCESS',
  DELETE_APP_FAILED: 'DELETE_APP_FAILED',

  UPDATE_APP: 'UPDATE_APP',
  UPDATE_APP_SUCCESS: 'UPDATE_APP_SUCCESS',
  UPDATE_APP_FAILED: 'UPDATE_APP_FAILED',

  FETCH_APP_AUTHENTICATION: 'FETCH_APP_AUTHENTICATION',
  FETCH_APP_AUTHENTICATION_SUCCESS: 'FETCH_APP_AUTHENTICATION_SUCCESS',
  FETCH_APP_AUTHENTICATION_FAILED: 'FETCH_APP_AUTHENTICATION_FAILED',
  CLEAR_APP_AUTHENTICATION: 'CLEAR_APP_AUTHENTICATION',

  // App Revisions Actions
  FETCH_APP_REVISION_LIST: 'FETCH_APP_REVISION_LIST',
  FETCH_APP_REVISION_LIST_SUCCESS: 'FETCH_APP_REVISION_LIST_SUCCESS',
  FETCH_APP_REVISION_LIST_FAILED: 'FETCH_APP_REVISION_LIST_FAILED',
  CLEAR_APP_REVISION_LIST: 'CLEAR_APP_REVISION_LIST',

  FETCH_APP_REVISION_DETAIL: 'FETCH_APP_REVISION_DETAIL',
  FETCH_APP_REVISION_DETAIL_SUCCESS: 'FETCH_APP_REVISION_DETAIL_SUCCESS',
  FETCH_APP_REVISION_DETAIL_FAILED: 'FETCH_APP_REVISION_DETAIL_FAILED',
  CLEAR_APP_REVISION_DETAIL: 'CLEAR_APP_REVISION_DETAIL',

  CREATE_APP_REVISION: 'CREATE_APP_REVISION',
  CREATE_APP_REVISION_SUCCESS: 'CREATE_APP_REVISION_SUCCESS',
  CREATE_APP_REVISION_FAILED: 'CREATE_APP_REVISION_FAILED',

  DECLINE_APP_REVISION: 'DECLINE_APP_REVISION',
  DECLINE_APP_REVISION_SUCCESS: 'DECLINE_APP_REVISION_SUCCESS',
  DECLINE_APP_REVISION_FAILED: 'DECLINE_APP_REVISION_FAILED',

  // Scopes Actions
  FETCH_SCOPE_LIST: 'FETCH_SCOPE_LIST',
  FETCH_SCOPE_LIST_SUCCESS: 'FETCH_SCOPE_LIST_SUCCESS',
  FETCH_SCOPE_LIST_FAILED: 'FETCH_SCOPE_LIST_FAILED',

  // Categories Actions
  FETCH_CATEGORY_LIST: 'FETCH_CATEGORY_LIST',
  FETCH_CATEGORY_LIST_SUCCESS: 'FETCH_CATEGORY_LIST_SUCCESS',
  FETCH_CATEGORY_LIST_FAILED: 'FETCH_CATEGORY_LIST_FAILED',

  // Desktop integration types
  FETCH_DESKTOP_INTEGRATION_TYPE_LIST: 'FETCH_DESKTOP_INTEGRATION_TYPE_LIST',
  FETCH_DESKTOP_INTEGRATION_TYPE_LIST_SUCCESS: 'FETCH_DESKTOP_INTEGRATION_TYPE_LIST_SUCCESS',
  FETCH_DESKTOP_INTEGRATION_TYPE_LIST_FAILED: 'FETCH_DESKTOP_INTEGRATION_TYPE_LIST_FAILED',

  DEVELOPER_FETCH_MY_IDENTITY: 'DEVELOPER_FETCH_MY_IDENTITY',
  DEVELOPER_SET_MY_IDENTITY: 'DEVELOPER_SET_MY_IDENTITY',
  DEVELOPER_FETCH_BILLING: 'DEVELOPER_FETCH_BILLING',
  DEVELOPER_FETCH_BILLING_SUCCESS: 'DEVELOPER_FETCH_BILLING_SUCCESS',
  DEVELOPER_FETCH_BILLING_FAILED: 'DEVELOPER_FETCH_BILLING_FAILED',
  DEVELOPER_FETCH_MONTHLY_BILLING: 'DEVELOPER_FETCH_MONTHLY_BILLING',
  DEVELOPER_FETCH_MONTHLY_BILLING_SUCCESS: 'DEVELOPER_FETCH_MONTHLY_BILLING_SUCCESS',
  DEVELOPER_FETCH_MONTHLY_BILLING_FAILED: 'DEVELOPER_FETCH_MONTHLY_BILLING_FAILED',
  DEVELOPER_PING_WEBHOOK: 'DEVELOPER_PING_WEBHOOK',
  DEVELOPER_SET_PING_WEBHOOK_STATUS: 'DEVELOPER_SET_PING_WEBHOOK_STATUS',

  // Developer App Modal
  SET_DEVELOPER_APP_MODAL_STATE_EDIT_DETAIL: 'SET_DEVELOPER_APP_MODAL_STATE_EDIT_DETAIL',
  SET_DEVELOPER_APP_MODAL_STATE_VIEW_DETAIL: 'SET_DEVELOPER_APP_MODAL_STATE_VIEW_DETAIL',
  SET_DEVELOPER_APP_MODAL_STATE_DELETE: 'SET_DEVELOPER_APP_MODAL_STATE_DELETE',

  // Auth actions
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_CHANGE_LOGIN_TYPE: 'AUTH_CHANGE_LOGIN_TYPE',
  AUTH_SET_REFRESH_SESSION: 'AUTH_SET_REFRESH_SESSION',
  AUTH_CLEAR: 'AUTH_CLEAR',
  USER_ACCEPT_TERM_AND_CONDITION: 'USER_ACCEPT_TERM_AND_CONDITION',

  SET_INIT_DEVELOPER_TERMS_ACCEPTED_STATE_FROM_COOKIE: 'SET_INIT_DEVELOPER_TERMS_ACCEPTED_STATE_FROM_COOKIE',
  SET_DEVELOPER_TERM_ACCEPTED_COOKIE_AND_STATE: 'SET_DEVELOPER_TERM_ACCEPTED_COOKIE_AND_STATE',

  SET_TERMS_ACCEPTED_STATE: 'SET_TERMS_ACCEPTED_STATE',

  // Error actions
  ERROR_THROWN_COMPONENT: 'ERROR_THROWN_COMPONENT',
  ERROR_THROWN_SERVER: 'ERROR_THROWN_SERVER',
  ERROR_CLEARED_COMPONENT: 'ERROR_CLEARED_COMPONENT',
  ERROR_CLEARED_SERVER: 'ERROR_CLEARED_SERVER',

  // notificarion message actions
  SHOW_NOTIFICATION_MESSAGE: 'SHOW_NOTIFICATION_MESSAGE',
  HIDE_NOTIFICATION_MESSAGE: 'HIDE_NOTIFICATION_MESSAGE',
  // app statistics actions
  APP_USAGE_STATS_REQUEST_DATA: 'APP_USAGE_STATS_REQUEST_DATA',
  APP_USAGE_STATS_LOADING: 'APP_USAGE_STATS_LOADING',
  APP_USAGE_STATS_REQUEST_DATA_FAILURE: 'APP_USAGE_STATS_REQUEST_DATA_FAILURE',
  APP_USAGE_STATS_RECEIVE_DATA: 'APP_USAGE_STATS_RECEIVE_DATA',
  APP_USAGE_STATS_CLEAR_DATA: 'APP_USAGE_STATS_CLEAR_DATA',

  // Developer actions
  DEVELOPER_CREATE: 'DEVELOPER_CREATE',
  DEVELOPER_SET_FORM_STATE: 'DEVELOPER_SET_FORM_STATE',
  DEVELOPER_SHOW_MODAL: 'DEVELOPER_SHOW_MODAL',

  // App detail modal
  SET_APP_DETAIL_MODAL_STATE_BROWSE: 'SET_APP_DETAIL_MODAL_STATE_BROWSE',
  SET_APP_DETAIL_MODAL_STATE_MANAGE: 'SET_APP_DETAIL_MODAL_STATE_MANAGE',
  SET_APP_DETAIL_MODAL_STATE_INSTALL: 'SET_APP_DETAIL_MODAL_STATE_INSTALL',
  SET_APP_DETAIL_MODAL_STATE_UNINSTALL: 'SET_APP_DETAIL_MODAL_STATE_UNINSTALL',
  SET_APP_DETAIL_MODAL_STATE_SUCCESS: 'SET_APP_DETAIL_MODAL_STATE_SUCCESS',

  FORGOT_PASSWORD_SUBMIT_EMAIL: 'FORGOT_PASSWORD_SUBMIT_EMAIL',
  FORGOT_PASSWORD_LOADING: 'FORGOT_PASSWORD_LOADING',

  // setings
  SETTING_FETCH_DEVELOPER_INFO: 'SETTING_FETCH_DEVELOPER_INFO',
  SETTING_FETCH_DEVELOPER_INFO_SUCCESS: 'SETTING_FETCH_DEVELOPER_INFO_SUCCESS',
  SETTING_SHOW_HIDE_LOADING: 'SETTING_SHOW_HIDE_LOADING',
  SETTING_UPDATE_DEVELOPER: 'SETTING_UPDATE_DEVELOPER',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',

  // reset password page
  RESET_PASSWORD_LOADING: 'RESET_PASSWORD_LOADING',
  RESET_PASSWORD: 'RESET_PASSWORD',

  // Installations
  APP_INSTALLATIONS_REQUEST_DATA: 'APP_INSTALLATIONS_REQUEST_DATA',
  APP_INSTALLATIONS_RECEIVE_DATA: 'APP_INSTALLATIONS_RECEIVE_DATA',
  APP_INSTALLATIONS_REQUEST_DATA_FAILURE: 'APP_INSTALLATIONS_REQUEST_DATA_FAILURE',
  APP_INSTALLATIONS_FILTER_REQUEST_DATA: 'APP_INSTALLATIONS_FILTER_REQUEST_DATA',
  APP_INSTALLATIONS_FILTER_RECEIVE_DATA: 'APP_INSTALLATIONS_FILTER_RECEIVE_DATA',
  APP_INSTALLATIONS_FILTER_REQUEST_DATA_FAILURE: 'APP_INSTALLATIONS_FILTER_REQUEST_DATA_FAILURE',

  APP_INSTALLATIONS_REQUEST_INSTALL: 'APP_INSTALLATIONS_REQUEST_INSTALL',
  APP_INSTALLATIONS_REQUEST_UNINSTALL: 'APP_INSTALLATIONS_REQUEST_UNINSTALL',
  APP_INSTALLATIONS_SET_FORM_STATE: 'APP_INSTALLATIONS_SET_FORM_STATE',

  // HttpTrafficEvent
  HTTP_TRAFFIC_PER_DAY_REQUEST_DATA: 'HTTP_TRAFFIC_PER_DAY_REQUEST_DATA',
  HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA: 'HTTP_TRAFFIC_PER_DAY_RECEIVE_DATA',
  HTTP_TRAFFIC_PER_DAY_REQUEST_FAILURE: 'HTTP_TRAFFIC_PER_DAY_REQUEST_FAILURE',

  //developer webhook
  WEBHOOK_EDIT_LOADING: 'WEBHOOK_EDIT_LOADING',
  WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA: 'WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA',
  WEBHOOK_EDIT_SUBCRIPTION_RECEIVE_DATA: 'WEBHOOK_EDIT_SUBCRIPTION_RECEIVE_DATA',
  WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA_FAILURE: 'WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA_FAILURE',
  WEBHOOK_CREATE: 'WEBHOOK_CREATE',
  WEBHOOK_EDIT: 'WEBHOOK_EDIT',
  WEBHOOK_DELETE: 'WEBHOOK_DELETE',
  WEBHOOK_REQUEST_DATA: 'WEBHOOK_REQUEST_DATA',
  WEBHOOK_RECEIVE_DATA: 'WEBHOOK_RECEIVE_DATA',
  WEBHOOK_RECEIVE_DATA_FAILURE: 'WEBHOOK_RECEIVE_DATA_FAILURE',
  WEBHOOK_DATA_CLEAR: 'WEBHOOK_DATA_CLEAR',
  WEBHOOK_SET_OPEN_MODAL: 'WEBHOOK_SET_OPEN_MODAL',

  // webhook subscriptions
  FETCH_WEBHOOKS_SUBSCRIPTIONS: 'FETCH_WEBHOOKS_SUBSCRIPTIONS',
  FETCH_WEBHOOKS_SUBSCRIPTIONS_SUCCESS: 'FETCH_WEBHOOKS_SUBSCRIPTIONS_SUCCESS',
  FETCH_WEBHOOKS_SUBSCRIPTIONS_FAILED: 'FETCH_WEBHOOKS_SUBSCRIPTIONS_FAILED',

  FETCH_WEBHOOK_TOPICS: 'FETCH_WEBHOOK_TOPICS',
  FETCH_WEBHOOK_TOPICS_SUCCESS: 'FETCH_WEBHOOK_TOPICS_SUCCESS',
  FETCH_WEBHOOK_TOPICS_FAILED: 'FETCH_WEBHOOK_TOPICS_FAILED',

  WEBHOOK_SET_APPLICATION_ID: 'WEBHOOK_SET_APPLICATION_ID',

  // Developer Subscriptions
  DEVELOPER_FETCH_SUBSCRIPTIONS: 'DEVELOPER_FETCH_SUBSCRIPTIONS',
  DEVELOPER_FETCH_SUBSCRIPTIONS_SUCCESS: 'DEVELOPER_FETCH_SUBSCRIPTIONS_SUCCESS',
  DEVELOPER_DELETE_SUBSCRIPTION: 'DEVELOPER_DELETE_SUBSCRIPTION',
  DEVELOPER_SUBSCRIPTION_CREATE: 'DEVELOPER_SUBSCRIPTION_CREATE',
  DEVELOPER_SUBSCRIPTION_CREATE_SUCCESS: 'DEVELOPER_SUBSCRIPTION_SUCCESS',
  DEVELOPER_SUBSCRIPTION_CREATE_FAILURE: 'DEVELOPER_SUBSCRIPTION_FAILURE',
  DEVELOPER_SUBSCRIPTION_CLEAR_CREATE_ERROR: 'DEVELOPER_SUBSCRIPTION_CLEAR_CREATE_ERROR',

  DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE: 'DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE',
  DEVELOPER_SET_STATUS_REQUEST: 'DEVELOPER_SET_STATUS_REQUEST',
  DEVELOPER_SET_STATUS_REQUEST_LOADING: 'DEVELOPER_SET_STATUS_REQUEST_LOADING',
  DEVELOPER_SET_STATUS_REQUEST_SUCCESS: 'DEVELOPER_SET_STATUS_REQUEST_SUCCESS',
  DEVELOPER_SET_STATUS_REQUEST_FAILURE: 'DEVELOPER_SET_STATUS_REQUEST_FAILURE',

  //DEVELOPERS
  ORGANISATION_FETCH_MEMBERS: 'ORGANISATION_FETCH_MEMBERS',
  ORGANISATION_FETCH_MEMBERS_SUCCESS: 'ORGANISATION_FETCH_MEMBERS_SUCCESS',
  ORGANISATION_FETCH_MEMBERS_FAILED: 'ORGANISATION_FETCH_MEMBERS_FAILED',

  INVITE_DEVELOPER_AS_ORG_MEMBER: 'INVITE_DEVELOPER_AS_ORG_MEMBER',
  INVITE_DEVELOPER_AS_ORG_MEMBER_SUCCESS: 'INVITE_DEVELOPER_AS_ORG_MEMBER_SUCCESS',
  INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED: 'INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED',

  FETCH_DEVELOPER_DETAILS: 'FETCH_DEVELOPER_DETAILS',
  FETCH_DEVELOPER_DETAILS_SUCCESS: 'FETCH_DEVELOPER_DETAILS_SUCCESS',
  FETCH_DEVELOPER_DETAILS_FAILED: 'FETCH_DEVELOPER_DETAILS_FAILED',

  FETCH_MEMBER_DETAILS: 'FETCH_MEMBER_DETAILS',
  FETCH_MEMBER_DETAILS_SUCCESS: 'FETCH_MEMBER_DETAILS_SUCCESS',
  FETCH_MEMBER_DETAILS_FAILED: 'FETCH_MEMBER_DETAILS_FAILED',

  ACCEPT_INVITE_MEMBER: 'ACCEPT_INVITE_MEMBER',
  REJECT_INVITE_MEMBER: 'REJECT_INVITE_MEMBER',
  SET_INVITE_MEMBER_STATUS: 'SET_INVITE_MEMBER_STATUS',
}

export default ActionTypes

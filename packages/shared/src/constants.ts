export const SERVICE_NAMES = {
  API_GATEWAY:  "api-gateway",
  AUTH:         "auth-service",
  INVENTORY:    "inventory-service",
  ACCOUNTING:   "accounting-service",
  BILLING:      "billing-service",
  INVOICE:      "invoice-service",
  WORKFLOW:     "workflow-service",
  AI:           "ai-service",
  REPORTING:    "reporting-service",
  AUDIT:        "audit-service",
  NOTIFICATION: "notification-service",
  ADMIN:        "admin-service",
} as const;

export const ROLES = {
  SUPER_ADMIN:  "SUPER_ADMIN",
  TENANT_ADMIN: "TENANT_ADMIN",
  USER:         "USER",
} as const;

export const PERMISSIONS = {
  INVENTORY_READ:   "INVENTORY:READ",
  INVENTORY_CREATE: "INVENTORY:CREATE",
  INVENTORY_UPDATE: "INVENTORY:UPDATE",
  INVENTORY_DELETE: "INVENTORY:DELETE",
} as const;

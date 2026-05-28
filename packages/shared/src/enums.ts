export enum AccountType         { ASSET="ASSET", LIABILITY="LIABILITY", EQUITY="EQUITY", REVENUE="REVENUE", EXPENSE="EXPENSE" }
export enum SubscriptionStatus  { TRIALING="TRIALING", ACTIVE="ACTIVE", PAST_DUE="PAST_DUE", CANCELED="CANCELED", UNPAID="UNPAID" }
export enum InvoiceStatus       { DRAFT="DRAFT", SENT="SENT", PAID="PAID", VOID="VOID" }
export enum WorkflowStatus      { PENDING="PENDING", RUNNING="RUNNING", COMPLETED="COMPLETED", FAILED="FAILED", CANCELLED="CANCELLED" }
export enum AIModelType         { FORECAST="FORECAST", DECISION="DECISION", COPILOT="COPILOT" }
export enum NotificationChannel { EMAIL="EMAIL", SMS="SMS", PUSH="PUSH", IN_APP="IN_APP" }
export enum NotificationStatus  { QUEUED="QUEUED", SENT="SENT", FAILED="FAILED" }

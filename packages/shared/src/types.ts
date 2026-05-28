export type TenantId = string;
export type UserId   = string;
export type JwtPayload = {
  sub: UserId;
  tenantId: TenantId;
  role: string[];
  iat: number;
  exp: number;
};

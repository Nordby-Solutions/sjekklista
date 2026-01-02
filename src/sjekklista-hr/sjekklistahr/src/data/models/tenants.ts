export type TenantDto = {
    id: string;
    number: number;
    name: string;
    slug: string;
}

export type GetTenantsResponse = {
    tenants: TenantDto[];
}
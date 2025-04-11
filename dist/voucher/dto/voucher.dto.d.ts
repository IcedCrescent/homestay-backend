export declare class CreateVoucherDto {
    code: string;
    discount: number;
    minSpend: number;
    from: Date;
    to: Date;
    room_class_id: number;
}
export declare class UpdateVoucherDto {
    code?: string;
    discount?: number;
    minSpend?: number;
    from?: Date;
    to?: Date;
    room_class_id?: number;
}

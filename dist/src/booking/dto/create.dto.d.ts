export declare class UserBookingDto {
    fullname: string;
    phone_number: string;
    identity_card_number: string;
}
export declare class CreateBookingDto {
    room_ids: number[];
    user_id: number;
    deposit: number;
    from: string;
    to: string;
    transaction_id?: number;
    user_bookings: UserBookingDto[];
}

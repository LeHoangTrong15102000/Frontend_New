export type LoginRequestDto = {
    user_name: string;
    pass_word: string;
};

export type LoginResponseDto = {
    token: string;
    user_info: any;
};
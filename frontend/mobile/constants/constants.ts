export const Role = {
    PATIENT: 'Patient',
    DOCTOR: 'Doctor'
} as const;

export type Role = typeof Role[keyof typeof Role];

export const URL: string = "https://2410-111-68-103-254.ngrok-free.app/api/user";
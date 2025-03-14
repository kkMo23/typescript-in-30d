enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
    GUEST = 'guest',
    SUPER_ADMIN = 'super_admin'
}

enum LogLevel {
    INFO = 1,
    ERROR = 2
}

function logMessage(level:LogLevel) {
    switch(level) {
        case LogLevel.INFO:
            return('INFO: This is an information message');
        case LogLevel.ERROR:
            return('ERROR: This is an error message');
        default:
            return ('DOLOLO: Dololo');
    };

}

function assignUserRole (role: UserRole) {
    switch(role) {
        case UserRole.ADMIN:
            return('You are an admin');
        case UserRole.CUSTOMER:
            return('You are a customer');
        case UserRole.GUEST:
            return('You are a guest');
        case UserRole.SUPER_ADMIN:
            return('You are a super admin');
        default:
            return ('DOLOLO: Dololo');
    };
}

function matchRoleToString(r: string) {
    switch(r) {
        case 'admin':
            return UserRole.ADMIN;
        case 'customer':
            return UserRole.CUSTOMER;
        case 'guest':
            return UserRole.GUEST;
        case 'super_admin':
            return UserRole.SUPER_ADMIN;
        default:
            return null;
    }
}

function doTheThangs() {
    const realRole = matchRoleToString('guest');
    if (realRole) {
        console.log(logMessage(LogLevel.INFO));
        console.log(assignUserRole(realRole));
    }
    else console.log(logMessage(LogLevel.ERROR));
}
doTheThangs();

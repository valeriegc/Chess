export const passwordInvalid = (password: string) => {
	let errors = [];
	let specialCh = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	let hasUpper = /[A-Z]/.test(password);
	let hasLower = /[a-z]/.test(password);

	if (password.length < 8) errors.push('be minimum 8 characters long');
	if (!hasUpper || !hasLower) errors.push('contain both uppercase and lowercase letters');
	if (!specialCh.test(password)) errors.push('contain at least 1 special character');
	if (errors.length == 0) return false;
	else if (errors.length == 1) return `The password must ${errors[0]}.`;
	else if (errors.length == 2) return `The password must ${errors[0]} and ${errors[1]}.`;
	else return `The password must ${errors[0]}, ${errors[1]} and ${errors[2]}.`;
};

import React from 'react';

interface IChangePasswordFormProps {}

const ChangePasswordForm: React.FC<
	IChangePasswordFormProps
> = () => {
	return (
		<div className="col-span-12 lg:col-span-8 2xl:col-span-9">
			<div className="intro-y box lg:mt-2">
				<div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
					<h2 className="font-medium text-base mr-auto">
						Change Password
					</h2>
				</div>
				<div className="p-5">
					<div>
						<label
							htmlFor="change-password-form-1"
							className="form-label">
							Old Password
						</label>
						<input
							id="change-password-form-1"
							type="password"
							className="form-control"
							placeholder="Input text"
						/>
					</div>
					<div className="mt-3">
						<label
							htmlFor="change-password-form-2"
							className="form-label">
							New Password
						</label>
						<input
							id="change-password-form-2"
							type="password"
							className="form-control"
							placeholder="Input text"
						/>
					</div>
					<div className="mt-3">
						<label
							htmlFor="change-password-form-3"
							className="form-label">
							Confirm New Password
						</label>
						<input
							id="change-password-form-3"
							type="password"
							className="form-control"
							placeholder="Input text"
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary mt-4">
						{' '}
						Change Password{' '}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordForm;

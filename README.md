# Tennis Shop Guru

## Creating a Model/Controller/View

```bash
dotnet-aspnet-codegenerator controller -name CompanyController -m Company -dc TSGContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries

dotnet-aspnet-codegenerator controller -name CustomerController -m Customer -dc TSGContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries

dotnet-aspnet-codegenerator controller -name UserController -m User -dc TSGContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries

dotnet-aspnet-codegenerator controller -name JobController -m Job -dc TSGContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries

dotnet-aspnet-codegenerator controller -name TimeSheetEntryController -m TimeSheetEntry -dc TSGContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries

dotnet-aspnet-codegenerator controller -name TimeSheetReportController -m TimeSheetReport -dc TSGContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries


dotnet aspnet-codegenerator identity --files "Account._StatusMessage;Account.AccessDenied;Account.ConfirmEmail;Account.ConfirmEmailChange;Account.ExternalLogin;Account.ForgotPassword;Account.ForgotPasswordConfirmation;Account.Lockout;Account.Login;Account.LoginWith2fa;Account.LoginWithRecoveryCode;Account.Logout;Account.Manage._Layout;Account.Manage._ManageNav;Account.Manage._StatusMessage;Account.Manage.ChangePassword;Account.Manage.DeletePersonalData;Account.Manage.Disable2fa;Account.Manage.DownloadPersonalData;Account.Manage.Email;Account.Manage.EnableAuthenticator;Account.Manage.ExternalLogins;Account.Manage.GenerateRecoveryCodes;Account.Manage.Index;Account.Manage.PersonalData;Account.Manage.ResetAuthenticator;Account.Manage.SetPassword;Account.Manage.ShowRecoveryCodes;Account.Manage.TwoFactorAuthentication;Account.Register;Account.RegisterConfirmation;Account.ResendEmailConfirmation;Account.ResetPassword;Account.ResetPasswordConfirmation" --userClass User

kubectl get pods --all-namespaces -o jsonpath='{.items[*].metadata.name}{"\n"}' --field-selector=status.phase=Shutdown


dotnet ef database update --context=TSGIdentityContext
```


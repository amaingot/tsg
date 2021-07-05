using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using TennisShopGuru.Models;


public class AdditionalUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<User, IdentityRole>
{
  public AdditionalUserClaimsPrincipalFactory(
    UserManager<User> userManager,
    RoleManager<IdentityRole> roleManager,
    IOptions<IdentityOptions> optionsAccessor)
    : base(userManager, roleManager, optionsAccessor)
  { }

  public async override Task<ClaimsPrincipal> CreateAsync(User user)
  {
    var principal = await base.CreateAsync(user);
    var identity = (ClaimsIdentity)principal.Identity;

    var claims = new List<Claim>();

    claims.Add(new Claim("CompanyID", user.CompanyID.ToString()));

    identity.AddClaims(claims);
    return principal;
  }
}
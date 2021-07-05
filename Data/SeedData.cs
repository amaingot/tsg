using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;

namespace TennisShopGuru.Models
{
  public static class SeedData
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      var userManager = serviceProvider.GetService<UserManager<User>>();
      var db = serviceProvider.GetService<TSGContext>();

      if (db.Company.Any())
      {
        return;
      }

      var admin = new User
      {
        UserName = "admin@tennisshop.guru",
        EmailConfirmed = true,
        FirstName = "Guru",
        LastName = "Tennis",
        Type = UserType.SuperAdmin,
      };
      userManager.CreateAsync(admin, "Password1");

      var company = new Company
      {
        Id = 1,
        Name = "US Tennis Association",
        Status = CompanyStatus.ACTIVE,
        Type = CompanyType.CUSTOMER,
        BusinessPhone = "+19876543210",
        Address = "123 New York Ave",
        AddressSecondary = "",
        StripeCustomerId = ""
      };
      db.Company.Add(company);
      db.SaveChanges();

      var customers = new Customer[]
      {
        new Customer{ Id = 1, FirstName = "Roger", LastName = "Federer", CompanyID = 1 },
        new Customer{ Id = 2, FirstName = "Rafael", LastName = "Nadal", CompanyID = 1 },
      };
      db.Customer.AddRange(customers);
      db.SaveChanges();
    }
  }
}
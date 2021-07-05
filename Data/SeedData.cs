// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
// using TennisShopGuru.Models;
// using System;
// using System.Linq;

// namespace TennisShopGuru.Models
// {
//   public static class SeedData
//   {
//     public static void Initialize(IServiceProvider serviceProvider)
//     {
//       using (var context = new TSGContext(
//           serviceProvider.GetRequiredService<
//               DbContextOptions<TSGContext>>()))
//       {
//         // Look for any companies.
//         if (context.Company.Any())
//         {
//           return;   // DB has been seeded
//         }

//         var company = new Company
//         {
//           Id = 1,
//           Name = "US Tennis Association",
//           Status = CompanyStatus.ACTIVE,
//           Type = CompanyType.CUSTOMER,
//           BusinessPhone = "+19876543210",
//           Address = "123 New York Ave",
//           AddressSecondary = "",
//           StripeCustomerId = ""
//         };
//         context.Company.Add(company);
//         context.SaveChanges();

//         var customers = new Customer[]
//         {
//           new Customer{ Id = 1, FirstName = "Roger", LastName = "Federer", CompanyID = 1 },
//           new Customer{ Id = 2, FirstName = "Rafael", LastName = "Nadal", CompanyID = 1 },
//         };
//         context.Customer.AddRange(customers);
//         context.SaveChanges();

//         var employees = new Employee[]
//         {
//           new Employee{ FirstName = "Jose", LastName = "Johnson", CompanyID = 1,  },
//           new Employee{ FirstName = "Sam", LastName = "Garcia", CompanyID = 1 },
//         };
//         context.Employee.AddRange(employees);
//         context.SaveChanges();

//         var jobs = new Job[]
//         {
//           new Job{ FirstName = "Jose", LastName = "Johnson", CompanyID = 1,  },

//         };
//         context.Job.AddRange(jobs);
//         context.SaveChanges();      }
//     }
//   }
// }
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace TennisShopGuru.Models
{
  public enum UserType
  {
    SuperAdmin,
    CustomerAdmin,
    Employee,
  }

  public class User : IdentityUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public UserType Type { get; set; }
    public string CellPhone { get; set; }

    public int? CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    public Company Company { get; set; }

    public ICollection<Job> Jobs { get; set; }

    public ICollection<TimeSheetEntry> TimeSheetEntries { get; set; }
  }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public class Customer : BaseEntity
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string CompanyName { get; set; }

    public int CompanyID { get; set; }

    [ForeignKey("CompanyID")]
    public Company Company { get; set; }

    public ICollection<Job> Jobs { get; set; }
    // Customer History
  }
}

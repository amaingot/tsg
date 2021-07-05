using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public enum CompanyStatus
  {
    ACTIVE,
    PAYMENT_FAILED,
    CANCELED,
    PAUSED,
  }

  public enum CompanyType
  {
    CUSTOMER,
    DEMO,
    TRIAL,
  }

  public class Company : BaseEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public CompanyStatus Status { get; set; }
    public CompanyType Type { get; set; }
    public string BusinessPhone { get; set; }
    public string Address { get; set; }
    public string AddressSecondary { get; set; }
    public string StripeCustomerId { get; set; }

    // Relations
    public ICollection<User> Users { get; set; }
    public ICollection<Customer> Customers { get; set; }
    public ICollection<Job> Jobs { get; set; }
    public ICollection<TimeSheetEntry> TimeSheetEntries { get; set; }
  }
}

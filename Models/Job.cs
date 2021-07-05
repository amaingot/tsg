using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public enum JobType
  {
    STRINGING_BASIC,
    STRINGING_HYBRID
  }

  public enum JobStatus
  {
    PENDING,
    FINISHED
  }

  public class Job : BaseEntity
  {
    public int Id { get; set; }
    public JobStatus Status { get; set; }
    public JobType Type { get; set; }
    public DateTime CompletedAt { get; set; }

    // Relationships

    public int CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    public Company Company { get; set; }

    public int CustomerID { get; set; }
    [ForeignKey("CustomerID")]
    public Customer Customer { get; set; }

    public int UserID { get; set; }
    [ForeignKey("UserID")]
    public User User { get; set; }
  }
}

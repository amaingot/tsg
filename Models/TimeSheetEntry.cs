using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public enum TimeSheetEntryStatus
  {
    IN_PROGRESS,
    COMPLETED,
    NEEDS_APPROVAL,
    PAID
  }

  public class TimeSheetEntry : BaseEntity
  {
    public int Id { get; set; }
    public TimeSheetEntryStatus Status { get; set; }
    public DateTime ClockedInAt { get; set; }
    public DateTime ClockedOutAt { get; set; }

    // Relationships

    public int CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    public Company Company { get; set; }

    public string UserID { get; set; }
    [ForeignKey("UserID")]
    public User User { get; set; }
  }
}

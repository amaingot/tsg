using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public enum TimeSheetReportStatus
  {
    ACTIVE,
    FINALIZED,
    PAID
  }

  public class TimeSheetReport : BaseEntity
  {
    public int Id { get; set; }
    public TimeSheetReportStatus Status { get; set; }
    public DateTime PayPeriodStart { get; set; }
    public DateTime PayPeriodEnd { get; set; }

    // Relationships
    public ICollection<TimeSheetEntry> TimeSheetEntries { get; set; }

    public int CompanyID { get; set; }
    [ForeignKey("CompanyID")]
    public Company Company { get; set; }
  }
}

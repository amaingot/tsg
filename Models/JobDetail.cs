using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisShopGuru.Models
{
  public enum JobDetailKey
  {
    RACKET_BRAND,
    RACKET_NAME,
    RACKET_SIZE,
    RACKET_SKU,
    STRINGS_BRAND,
    STRINGS_NAME,
    STRINGS_TENSION,
    STRINGS_SKU,
    MAIN_STRINGS_BRAND,
    MAIN_STRINGS_NAME,
    MAIN_STRINGS_TENSION,
    MAIN_STRINGS_SKU,
    CROSS_STRINGS_BRAND,
    CROSS_STRINGS_NAME,
    CROSS_STRINGS_TENSION,
    CROSS_STRINGS_SKU
  }

  public class JobDetail : BaseEntity
  {
    public int Id { get; set; }
    public JobDetailKey Key { get; set; }
    public string Value { get; set; }

    public int JobID { get; set; }
    [ForeignKey("JobID")]
    public Job Job { get; set; }
  }
}

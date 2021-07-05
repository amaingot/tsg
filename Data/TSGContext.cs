using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TennisShopGuru.Models;

public class TSGContext : IdentityDbContext<User>
{
  public TSGContext(DbContextOptions<TSGContext> options)
      : base(options)
  {
  }

  public override int SaveChanges()
  {
    var entries = ChangeTracker
        .Entries()
        .Where(e => e.Entity is BaseEntity && (
                e.State == EntityState.Added
                || e.State == EntityState.Modified));

    foreach (var entityEntry in entries)
    {
      ((BaseEntity)entityEntry.Entity).UpdatedDate = DateTime.Now;
      // ((BaseEntity)entityEntry.Entity).UpdatedBy = Thread.CurrentPrincipal.Identity.Name;

      if (entityEntry.State == EntityState.Added)
      {
        ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
        // ((BaseEntity)entityEntry.Entity).CreatedBy = Thread.CurrentPrincipal.Identity.Name;
      }
    }

    return base.SaveChanges();
  }

  public DbSet<Company> Company { get; set; }

  public DbSet<User> User { get; set; }

  public DbSet<Customer> Customer { get; set; }

  public DbSet<CustomerDetail> CustomerDetail { get; set; }

  public DbSet<Job> Job { get; set; }

  public DbSet<JobDetail> JobDetail { get; set; }

  public DbSet<TimeSheetEntry> TimeSheetEntry { get; set; }

  public DbSet<TimeSheetReport> TimeSheetReport { get; set; }
}

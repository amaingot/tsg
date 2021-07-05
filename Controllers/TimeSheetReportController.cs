using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TennisShopGuru.Models;

namespace TennisShopGuru.Controllers
{
    public class TimeSheetReportController : Controller
    {
        private readonly TSGContext _context;

        public TimeSheetReportController(TSGContext context)
        {
            _context = context;
        }

        // GET: TimeSheetReport
        public async Task<IActionResult> Index()
        {
            var tSGContext = _context.TimeSheetReport.Include(t => t.Company);
            return View(await tSGContext.ToListAsync());
        }

        // GET: TimeSheetReport/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var timeSheetReport = await _context.TimeSheetReport
                .Include(t => t.Company)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSheetReport == null)
            {
                return NotFound();
            }

            return View(timeSheetReport);
        }

        // GET: TimeSheetReport/Create
        public IActionResult Create()
        {
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id");
            return View();
        }

        // POST: TimeSheetReport/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Status,PayPeriodStart,PayPeriodEnd,CompanyID,CreatedDate,UpdatedDate,CreatedBy,UpdatedBy")] TimeSheetReport timeSheetReport)
        {
            if (ModelState.IsValid)
            {
                _context.Add(timeSheetReport);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id", timeSheetReport.CompanyID);
            return View(timeSheetReport);
        }

        // GET: TimeSheetReport/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var timeSheetReport = await _context.TimeSheetReport.FindAsync(id);
            if (timeSheetReport == null)
            {
                return NotFound();
            }
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id", timeSheetReport.CompanyID);
            return View(timeSheetReport);
        }

        // POST: TimeSheetReport/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Status,PayPeriodStart,PayPeriodEnd,CompanyID,CreatedDate,UpdatedDate,CreatedBy,UpdatedBy")] TimeSheetReport timeSheetReport)
        {
            if (id != timeSheetReport.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(timeSheetReport);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TimeSheetReportExists(timeSheetReport.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id", timeSheetReport.CompanyID);
            return View(timeSheetReport);
        }

        // GET: TimeSheetReport/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var timeSheetReport = await _context.TimeSheetReport
                .Include(t => t.Company)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSheetReport == null)
            {
                return NotFound();
            }

            return View(timeSheetReport);
        }

        // POST: TimeSheetReport/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var timeSheetReport = await _context.TimeSheetReport.FindAsync(id);
            _context.TimeSheetReport.Remove(timeSheetReport);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TimeSheetReportExists(int id)
        {
            return _context.TimeSheetReport.Any(e => e.Id == id);
        }
    }
}

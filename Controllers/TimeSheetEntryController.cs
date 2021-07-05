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
    public class TimeSheetEntryController : Controller
    {
        private readonly TSGContext _context;

        public TimeSheetEntryController(TSGContext context)
        {
            _context = context;
        }

        // GET: TimeSheetEntry
        public async Task<IActionResult> Index()
        {
            var tSGContext = _context.TimeSheetEntry.Include(t => t.Company).Include(t => t.User);
            return View(await tSGContext.ToListAsync());
        }

        // GET: TimeSheetEntry/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var timeSheetEntry = await _context.TimeSheetEntry
                .Include(t => t.Company)
                .Include(t => t.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSheetEntry == null)
            {
                return NotFound();
            }

            return View(timeSheetEntry);
        }

        // GET: TimeSheetEntry/Create
        public IActionResult Create()
        {
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id");
            ViewData["UserID"] = new SelectList(_context.Users, "Id", "Id");
            return View();
        }

        // POST: TimeSheetEntry/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Status,ClockedInAt,ClockedOutAt,CompanyID,UserID,CreatedDate,UpdatedDate,CreatedBy,UpdatedBy")] TimeSheetEntry timeSheetEntry)
        {
            if (ModelState.IsValid)
            {
                _context.Add(timeSheetEntry);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id", timeSheetEntry.CompanyID);
            ViewData["UserID"] = new SelectList(_context.Users, "Id", "Id", timeSheetEntry.UserID);
            return View(timeSheetEntry);
        }

        // GET: TimeSheetEntry/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var timeSheetEntry = await _context.TimeSheetEntry.FindAsync(id);
            if (timeSheetEntry == null)
            {
                return NotFound();
            }
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id", timeSheetEntry.CompanyID);
            ViewData["UserID"] = new SelectList(_context.Users, "Id", "Id", timeSheetEntry.UserID);
            return View(timeSheetEntry);
        }

        // POST: TimeSheetEntry/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Status,ClockedInAt,ClockedOutAt,CompanyID,UserID,CreatedDate,UpdatedDate,CreatedBy,UpdatedBy")] TimeSheetEntry timeSheetEntry)
        {
            if (id != timeSheetEntry.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(timeSheetEntry);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TimeSheetEntryExists(timeSheetEntry.Id))
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
            ViewData["CompanyID"] = new SelectList(_context.Company, "Id", "Id", timeSheetEntry.CompanyID);
            ViewData["UserID"] = new SelectList(_context.Users, "Id", "Id", timeSheetEntry.UserID);
            return View(timeSheetEntry);
        }

        // GET: TimeSheetEntry/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var timeSheetEntry = await _context.TimeSheetEntry
                .Include(t => t.Company)
                .Include(t => t.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSheetEntry == null)
            {
                return NotFound();
            }

            return View(timeSheetEntry);
        }

        // POST: TimeSheetEntry/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var timeSheetEntry = await _context.TimeSheetEntry.FindAsync(id);
            _context.TimeSheetEntry.Remove(timeSheetEntry);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TimeSheetEntryExists(int id)
        {
            return _context.TimeSheetEntry.Any(e => e.Id == id);
        }
    }
}

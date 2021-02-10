using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TestAppWebApi.Models;

namespace TestAppWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUserDetails()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet ("findall")]
        public IActionResult findActive()
        {
            try
            {
                //int i = 0;
                //var data = from user in _context.Users
                //           where user.Active == true
                //           select new UserActive
                //           {
                //               TotalCount = i,
                //               ActiveCount= user.Count(x=>x.user.)
                //           };
                int TotalCount = _context.Users.Count();
                var ActivCount = _context.Users.Where(act=>act.Active==true).Count(activeC => activeC.Active);
                var list =new UserActive
                {
                    TotalCount = TotalCount,
                    ActiveCount = ActivCount
                };
                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserDetail(int id)
        {
            var userDetail = await _context.Users.FindAsync(id);

            if (userDetail == null)
            {
                return NotFound();
            }

            return userDetail;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDetail(int id, User userDetail)
        {
            if (id != userDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(userDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUserDetail(User userDetail)
        {
            _context.Users.Add(userDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentDetail", new { id = userDetail.Id }, userDetail);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDetail(int id)
        {
            var userDetail = await _context.Users.FindAsync(id);
            if (userDetail == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserDetailExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}

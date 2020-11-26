using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HumanResources.Data;
using HumanResources.Models;
using HumanResources.Repositories;
using Microsoft.Extensions.Logging;

namespace HumanResources.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly IRepositoryWrapper repository;

        public EmployeesController(ILogger logger, IRepositoryWrapper repository)
        {
            this.logger = logger;
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            try
            {
                var employees = await repository.Employee.FindAll().ToListAsync();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id, [FromQuery] bool withDetails = false)
        {
            try
            {
                var employee = await repository.Employee.FindById(id, withDetails).FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpGet("byuserid/{userId}")]
        public async Task<IActionResult> GetEmployeeByUserId(string userId, [FromQuery] bool withDetails = false)
        {
            try
            {
                var employee = await repository.Employee.FindByUserId(userId, withDetails).FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            try
            {
                if (id != employee.Id)
                {
                    return BadRequest();
                }

                repository.Employee.Update(employee);

                try
                {
                    await repository.SaveAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!repository.Employee.CheckIfExists(id))
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
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostEmployee(Employee employee)
        {
            try
            {
                repository.Employee.Create(employee);
                await repository.SaveAsync();

                return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var employee = await repository.Employee.FindById(id).FirstOrDefaultAsync();
                if (employee == null)
                {
                    return NotFound();
                }

                repository.Employee.Delete(employee);
                await repository.SaveAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}

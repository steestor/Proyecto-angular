using ITI.Core;
using ITI.Core.Features.Application.ScheduledTasks.Dtos;
using ITI.Core.Features.Application.ScheduledTasks.Services;
using ITI.Core.Features.Domain.ScheduledTasks.Entities;
using ITI.Core.Persistence.Repositories;
using Proyecto.Domain.Entities;
using Proyecto.Domain.Factories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto.Application.Features.ScheduledTasks
{
    public class TareasProgramadasStore : IScheduledTasksStore
    {
        private IReadOnlyRepository<TareaProgramada> ReadOnlyRepository { get; set; }

        private IRepository<TareaProgramada, int> Repository { get; set; }

        public TareasProgramadasStore(IReadOnlyRepository<TareaProgramada> readOnlyRepository, IRepository<TareaProgramada, int> repository)
        {
            this.ReadOnlyRepository = readOnlyRepository;
            this.Repository = repository;
        }

        public IQueryable<IScheduledTask> GetAll()
        {
            return this.ReadOnlyRepository.GetAll();
        }

        public async Task<IScheduledTask> Read(int id)
        {
            return await this.Repository.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IScheduledTask> Create(ScheduledTaskDto dto)
        {
            TareaProgramada tarea = TareasProgramadaFactory.CrearTareaProgramada(dto.Name, dto.Identifier, dto.Cron).WithTimeout(dto.Timeout);

            UpdateIsActive(tarea, dto.IsActive);


            return await this.Repository.InsertAsync(tarea);
        }

        public async Task<IScheduledTask> Update(ScheduledTaskDto dto)
        {
            TareaProgramada entity = await this.Repository.GetAsync(dto.Id);

            if (entity == null)
            {
                throw new DataException("No existe la tarea programada con id : " + dto.Id);
            }

            entity.ConCron(dto.Cron);
            entity.ConIdentificador(dto.Identifier);
            entity.ConNombre(dto.Name);
            entity.WithTimeout(dto.Timeout);

            UpdateIsActive(entity, dto.IsActive);


            return await this.Repository.UpdateAsync(entity);

        }

        public TareaProgramada UpdateIsActive(TareaProgramada entity, bool? isActive)
        {
            Check.NotNull(entity, nameof(entity));


            return isActive.HasValue && isActive.Value ? entity.Activar() : entity.Desactivar();
        }

        public async Task Delete(int id)
        {
            TareaProgramada tarea = await this.Repository.GetAsync(id);

            if (tarea == null)
            {
                throw new DataException("No existe la tarea programada con id: " + id);
            }


            await this.Repository.DeleteAsync(tarea);

        }


    }
}

using ITI.Core.Domain.Entities;
using ITI.Core.Domain.Entities.Audit;
using ITI.Core.Features.Domain.ScheduledTasks.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Proyecto.Domain.Entities
{
    public class TareaProgramada : IScheduledTask, IHaveTenant, IAudited
    {


        protected internal TareaProgramada(string name, string identifier, string cron)
        {
            ConNombre(name);
            ConIdentificador(identifier);
            ConCron(cron);
            IsActive = true;
        }

        public TareaProgramada Activar()
        {
            if (!this.IsActive)
            {
                this.IsActive = true;
            }

            return this;
        }

        public TareaProgramada Desactivar()
        {
            if (this.IsActive)
            {
                this.IsActive = false;
            }

            return this;
        }

        public TareaProgramada ConCron(string cron)
        {
            this.Cron = cron;

            return this;
        }

        public TareaProgramada ConIdentificador(string identifier)
        {
            this.Identifier = identifier;

            return this;
        }

        public TareaProgramada ConNombre(string name)
        {
            this.Name = name;

            return this;
        }

        public TareaProgramada WithTimeout(int? timeout)
        {
            this.Timeout = timeout;

            return this;
        }

        public string GetUniqueTaskIdentifier()
        {
            return string.Format("{0}{1}", this.Id, this.Identifier);
        }

        public string Name { get; protected set; }

        public string Identifier { get; protected set; }

        public string Cron { get; protected set; }

        public bool IsActive { get; set; }

        public int? Timeout { get; set; }

        public byte[] Version { get; set; }

        public bool IsTransient => this.Id == default(int);

        public int Id { get; set; }

        public Guid? TenantId { get; protected set; }

        public DateTime CreationDate { get; protected set; }

        public int? CreatorUserId { get; protected set; }

        public DateTime? LastModificationDate { get; protected set; }

        public int? LastModificationUserId { get; protected set; }
    }
}

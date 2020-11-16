using ITI.Core.Ambits;
using ITI.Core.Application.Dtos;
using ITI.Core.Application.Factories;
using ITI.Core.Runtime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Proyecto.Application.Authentication
{
    public class UserSession : IUserSession
    {
        public Guid? TenantId => null;

        public int? UserId => null;

        public bool IsSuperUser => false;

        public IRepositoryFactory RepositoryFactory { get; set; }
        public UserSession(IRepositoryFactory repositoryFactory)
        {
            RepositoryFactory = repositoryFactory;
        }
        public IEnumerable<TAmbitPrimaryKey> GetAllowedAmbits<TAmbit, TAmbitPrimaryKey>(string permission, IListOptions options) where TAmbit : class, IAmbit<TAmbitPrimaryKey>
        {
            return this.RepositoryFactory.CreateReadOnly<TAmbit>().GetAll().Select(x => x.Id);
        }


        public TAmbitPrimaryKey GetDefaultAmbit<TAmbit, TAmbitPrimaryKey>() where TAmbit : IAmbit<TAmbitPrimaryKey>
        {
            return default(TAmbitPrimaryKey);
        }

        public TAmbitPrimaryKey GetDefaultAmbitFromEntity<T, TAmbitPrimaryKey>()
        {
            return default(TAmbitPrimaryKey);
        }
    }
}

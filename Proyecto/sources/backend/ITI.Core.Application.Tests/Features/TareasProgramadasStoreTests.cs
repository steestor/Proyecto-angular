using ITI.Core.Features.Application.ScheduledTasks.Dtos;
using ITI.Core.Persistence.Repositories;
using Proyecto.Application.Features.ScheduledTasks;
using Proyecto.Domain.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Threading.Tasks;

namespace ITI.Core.Application.Tests.Features
{
    [TestClass]
    public class TareasProgramadasStoreTests
    {
        private TareasProgramadasStore store;

        private Mock<IReadOnlyRepository<TareaProgramada>> readOnlyRepository;

        private Mock<IRepository<TareaProgramada, int>> repository;

        [TestInitialize]
        public void Setup()
        {
            //Configuramos el contexto de las pruebas

            readOnlyRepository = new Mock<IReadOnlyRepository<TareaProgramada>>();
            repository = new Mock<IRepository<TareaProgramada, int>>();

            store = new TareasProgramadasStore(readOnlyRepository.Object, repository.Object);

        }

        [TestMethod]
        public async Task Create_ReturnsTareaProgramada()
        {
            //Configuramos el comportamiento esperado del repositorio.

            repository.Setup(x => x.InsertAsync(It.IsAny<TareaProgramada>())).Returns<TareaProgramada>(t => Task.FromResult(t)).Verifiable();

            var dto = new ScheduledTaskDto() { Cron = "***?", Identifier = "tareaPrueba", Name = "Tarea de prueba", IsActive = true };

            //Llamamos al código que queremos testear
            var result = await store.Create(dto);

            //Validamos el comportamiento del código.
            Assert.IsNotNull(result);

            Assert.AreEqual(dto.Cron, result.Cron);
            Assert.AreEqual(dto.Identifier, result.Identifier);
            Assert.AreEqual(dto.Name, result.Name);
            Assert.AreEqual(dto.IsActive, result.IsActive);

            repository.VerifyAll();
        }
    }
}

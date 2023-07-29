using Microsoft.AspNetCore.Mvc;
using Moq;
using WebApp.Controllers;
using WebApp.Infrastructure;
using WebApp.Models;
using System.Collections.Generic;
using System.Linq;
using Xunit;
 
namespace WebAppTest
{
    public class GiftControllerTest
    {
        [Fact]
        public void Test_GET_AllGifts()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.Gifts).Returns(Multiple());
            var controller = new GiftController(mockRepo.Object);
 
            // Act
            var result = controller.Get();
 
            // Assert
            var model = Assert.IsAssignableFrom<IEnumerable<Gift>>(result);
            Assert.Equal(3, model.Count());
        }
 
        private static IEnumerable<Gift> Multiple()
        {
            var r = new List<Gift>();
            r.Add(new Gift()
            {
                giftId = 01,
                giftName = "Photo Frame",
                GiftImageURL = "photoframe.png",
                giftDetails = "awesome photo",
                giftPrice = 500
            });
            r.Add(new Gift()
            {
                giftId = 02,
                giftName = "Photo Frame",
                GiftImageURL = "photoframe.png",
                giftDetails = "awesome photo",
                giftPrice = 500
            });
            r.Add(new Gift()
            {
                giftId = 03,
                giftName = "Photo Frame",
                GiftImageURL = "photoframe.png",
                giftDetails = "awesome photo",
                giftPrice = 500
            });
            return r;
        }

        [Fact]
        public void Test_POST_AddGift()
        {
            // Arrange
            Gift r = new Gift()
            {
                giftId = 04,
                giftName = "Photo Frame",
                GiftImageURL = "photoframe.png",
                giftDetails = "awesome photo",
                giftPrice = 500
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.AddGift(It.IsAny<Gift>())).Returns(r);
            var controller = new GiftController(mockRepo.Object);
        
            // Act
            var result = controller.Post(r);
        
            // Assert
            var gift = Assert.IsType<Gift>(result);
            Assert.Equal(04, gift.giftId);
            Assert.Equal("Photo Frame", gift.giftName);
            Assert.Equal("photoframe.png", gift.GiftImageURL);
            Assert.Equal("awesome photo", gift.giftDetails);
            Assert.Equal(500, gift.giftPrice);

        }

        [Fact]
        public void Test_PUT_UpdateGift()
        {
            // Arrange
            Gift r = new Gift()
            {
                giftId = 01,
                giftName = "new Photo Frame",
                GiftImageURL = "photoframe.png",
                giftDetails = "awesome photo",
                giftPrice = 500
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.UpdateGift(It.IsAny<Gift>())).Returns(r);
            var controller = new GiftController(mockRepo.Object);
        
            // Act
            var result = controller.Put(r);
        
            // Assert
            var gift = Assert.IsType<Gift>(result);
            Assert.Equal(04, gift.giftId);
            Assert.Equal("Photo Frame", gift.giftName);
            Assert.Equal("photoframe.png", gift.GiftImageURL);
            Assert.Equal("awesome photo", gift.giftDetails);
            Assert.Equal(500, gift.giftPrice);
        }

        [Fact]
        public void Test_DELETE_Gift()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.DeleteGift(It.IsAny<int>())).Verifiable();
            var controller = new GiftController(mockRepo.Object);
        
            // Act
            controller.Delete(3);
        
            // Assert
            mockRepo.Verify();
        }
    }
}

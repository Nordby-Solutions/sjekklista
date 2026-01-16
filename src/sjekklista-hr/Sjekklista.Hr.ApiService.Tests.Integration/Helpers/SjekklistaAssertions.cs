using Microsoft.AspNetCore.Mvc;
using Sjekklista.Hr.ApiService.Shared;

namespace Sjekklista.Hr.ApiService.Tests.Integration.Helpers
{
    public static class SjekklistaAssertions
    {
        public static void Assert200OkResponse(this HttpResponseMessage response)
        {
            Assert.True(response.IsSuccessStatusCode, $"Expected 200 OK but got {(int)response.StatusCode}");
        }

        public static async Task<ValidationProblemDetails> Assert400BadRequestValidation(this HttpResponseMessage response)
        {
            Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);

            return (await response.Content!.ReadFromJsonAsync<ValidationProblemDetails>())!;
        }

        public static async Task<Error[]> Assert400BadRequestError(this HttpResponseMessage response)
        {
            Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);

            return (await response.Content!.ReadFromJsonAsync<Error[]>())!;
        }

        public static async Task Assert404NotFound(this HttpResponseMessage response)
        {
            string responseContent = await response.Content.ReadAsStringAsync();
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}

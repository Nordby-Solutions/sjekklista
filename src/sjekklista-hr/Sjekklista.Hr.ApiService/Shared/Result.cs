namespace Sjekklista.Hr.ApiService.Shared
{
    public sealed class Result
    {
        private Result(bool isSuccess, Error[] errors)
        {
            IsSuccess = isSuccess;
            Errors = errors;
        }

        public bool IsSuccess { get; }

        public Error[] Errors { get; }

        public static Result Success() => new(true, Array.Empty<Error>());

        public static Result Failure(params Error[] errors) => new(false, errors);

        public static Result<T> Success<T>(T value) => new(true, value, Array.Empty<Error>());

        public static Result<T> Failure<T>(params Error[] errors) => new(false, default!, errors);
    }

    public sealed class Result<T>
    {
        internal Result(bool isSuccess, T value, Error[] errors)
        {
            IsSuccess = isSuccess;
            Value = value;
            Errors = errors;
        }

        public bool IsSuccess { get; }

        public T Value { get; }

        public Error[] Errors { get; }
    }

    public sealed record Error(string Code, string Message, string? Field = null);
}

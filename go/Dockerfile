FROM golang:1.15 AS build

ENV GOOS linux
ENV CGO_ENABLED 0

WORKDIR /go/src/hw1

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN cd /go/src/hw1/ && go build -o webhw1

FROM alpine:3.14 AS production

ENV GIN_MODE release
ENV PORT 8081 
ENV HOST_LAN_IP 51.195.51.121

RUN apk add --no-cache ca-certificates

COPY --from=build /go/src/hw1 .

EXPOSE 8080

CMD ./webhw1

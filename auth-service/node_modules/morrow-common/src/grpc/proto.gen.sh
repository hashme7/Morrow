# protoc --plugin=protoc-gen-ts_proto=/Users/apple/Desktop/morrow-common/src/grpc/user.proto /node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./grpc/user.proto --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true



protoc \
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=. \
  --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true \
  src/grpc/cmn.proto

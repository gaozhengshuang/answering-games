// Code generated by protoc-gen-go. DO NOT EDIT.
// source: proto/user.proto

/*
Package user is a generated protocol buffer package.

It is generated from these files:
	proto/user.proto

It has these top-level messages:
	EntityBase
	UserData
	ItemData
*/
package user

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type EntityBase struct {
	Id               *uint64 `protobuf:"varint,1,opt,name=id" json:"id,omitempty"`
	Name             *string `protobuf:"bytes,2,opt,name=name" json:"name,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *EntityBase) Reset()                    { *m = EntityBase{} }
func (m *EntityBase) String() string            { return proto.CompactTextString(m) }
func (*EntityBase) ProtoMessage()               {}
func (*EntityBase) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *EntityBase) GetId() uint64 {
	if m != nil && m.Id != nil {
		return *m.Id
	}
	return 0
}

func (m *EntityBase) GetName() string {
	if m != nil && m.Name != nil {
		return *m.Name
	}
	return ""
}

type UserData struct {
	Base             *EntityBase `protobuf:"bytes,1,opt,name=base" json:"base,omitempty"`
	Level            *int32      `protobuf:"varint,2,opt,name=level" json:"level,omitempty"`
	Exp              *int32      `protobuf:"varint,3,opt,name=exp" json:"exp,omitempty"`
	Items            *ItemData   `protobuf:"bytes,4,opt,name=items" json:"items,omitempty"`
	XXX_unrecognized []byte      `json:"-"`
}

func (m *UserData) Reset()                    { *m = UserData{} }
func (m *UserData) String() string            { return proto.CompactTextString(m) }
func (*UserData) ProtoMessage()               {}
func (*UserData) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *UserData) GetBase() *EntityBase {
	if m != nil {
		return m.Base
	}
	return nil
}

func (m *UserData) GetLevel() int32 {
	if m != nil && m.Level != nil {
		return *m.Level
	}
	return 0
}

func (m *UserData) GetExp() int32 {
	if m != nil && m.Exp != nil {
		return *m.Exp
	}
	return 0
}

func (m *UserData) GetItems() *ItemData {
	if m != nil {
		return m.Items
	}
	return nil
}

type ItemData struct {
	Id               *int32 `protobuf:"varint,1,opt,name=id" json:"id,omitempty"`
	Num              *int32 `protobuf:"varint,2,opt,name=num" json:"num,omitempty"`
	XXX_unrecognized []byte `json:"-"`
}

func (m *ItemData) Reset()                    { *m = ItemData{} }
func (m *ItemData) String() string            { return proto.CompactTextString(m) }
func (*ItemData) ProtoMessage()               {}
func (*ItemData) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *ItemData) GetId() int32 {
	if m != nil && m.Id != nil {
		return *m.Id
	}
	return 0
}

func (m *ItemData) GetNum() int32 {
	if m != nil && m.Num != nil {
		return *m.Num
	}
	return 0
}

func init() {
	proto.RegisterType((*EntityBase)(nil), "user.EntityBase")
	proto.RegisterType((*UserData)(nil), "user.UserData")
	proto.RegisterType((*ItemData)(nil), "user.ItemData")
}

func init() { proto.RegisterFile("proto/user.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 169 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x4c, 0x8e, 0xc1, 0x0a, 0x82, 0x40,
	0x10, 0x86, 0x51, 0x57, 0xb0, 0xdf, 0x0a, 0xd9, 0xd3, 0x5e, 0x0a, 0x31, 0x08, 0x4f, 0x06, 0x3d,
	0x42, 0xd4, 0xa1, 0x07, 0xe8, 0x01, 0x36, 0x9a, 0x83, 0xe0, 0xaa, 0xb8, 0x63, 0xd4, 0xdb, 0x87,
	0x23, 0x81, 0xb7, 0x6f, 0x60, 0xbe, 0x8f, 0x1f, 0x59, 0x3f, 0x74, 0xdc, 0x9d, 0x46, 0x4f, 0x43,
	0x25, 0xa8, 0xd5, 0xc4, 0xc5, 0x11, 0xb8, 0xb5, 0x5c, 0xf3, 0xf7, 0x62, 0x3d, 0x69, 0x20, 0xac,
	0x5f, 0x26, 0xc8, 0x83, 0x52, 0xe9, 0x35, 0x54, 0x6b, 0x1d, 0x99, 0x30, 0x0f, 0xca, 0x55, 0x41,
	0x48, 0x1e, 0x9e, 0x86, 0xab, 0x65, 0xab, 0xf7, 0x50, 0x4f, 0xeb, 0x49, 0xfe, 0xd2, 0x73, 0x56,
	0x49, 0x74, 0x51, 0xd9, 0x20, 0x6e, 0xe8, 0x4d, 0x8d, 0xa8, 0xb1, 0x4e, 0x11, 0xd1, 0xa7, 0x37,
	0x91, 0x1c, 0x3b, 0xc4, 0x35, 0x93, 0xf3, 0x46, 0x89, 0xbc, 0x9d, 0xe5, 0x3b, 0x93, 0x9b, 0xd2,
	0xc5, 0x01, 0xc9, 0x9f, 0x17, 0x63, 0xa4, 0xd1, 0x8e, 0x6e, 0x0e, 0xfe, 0x02, 0x00, 0x00, 0xff,
	0xff, 0xff, 0xed, 0x38, 0x94, 0xcc, 0x00, 0x00, 0x00,
}
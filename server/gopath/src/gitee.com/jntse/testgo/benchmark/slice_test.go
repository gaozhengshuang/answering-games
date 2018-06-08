package mytest
import "testing"
import "fmt"
//import "runtime"
type fmts fmt.Stringer


// --------------------------------------------------------------------------
/// @brief  slice使用内建copy，循环copy，直接赋值
/// @return 
// --------------------------------------------------------------------------
// 效率低于Assign
func BenchmarkSliceCopy(b *testing.B) {
	b.StopTimer()
	s1, s2 := make([]byte, 128), make([]byte, 128)
	b.StartTimer()
	for i:=0; i < 128; i++ {
		s1[i], s2[i] = byte(i), byte(i)
	}

	for i := 0; i < b.N; i++ {
		copy(s1, s2)
	}
}

// 效率最高
func BenchmarkSliceAssign(b *testing.B) {
	b.StopTimer()
	s1, s2 := make([]byte, 128), make([]byte, 128)
	b.StartTimer()
	for i:=0; i < 128; i++ {
		s1[i], s2[i] = byte(i), byte(i)
	}

	for i := 0; i < b.N; i++ {
		s1 = s2
		s1[0] = 0
	}
}

// 效率远低于内建copy方法
func BenchmarkSliceRangeCopy(b *testing.B) {
	b.StopTimer()
	s1, s2 := make([]byte, 128), make([]byte, 128)
	for i:=0; i < 128; i++ {
		s1[i], s2[i] = byte(i), byte(i)
	}
	b.StartTimer()
	myCopy := func(dst []byte, src []byte) int {
		ld, ls := len(dst), len(src)
		for i, _ := range dst {
			if i > ls { return i }
			dst[i] = src[i]
		}
		return ld
	}

	for i := 0; i < b.N; i++ {
		myCopy(s1, s2)
	}
}

// --------------------------------------------------------------------------
/// @brief slice直接make申请，或者引用一个数组
/// @return 
// --------------------------------------------------------------------------
// 每次都make 堆上申请
func BenchmarkSliceMake(b *testing.B) {
	for i := 0; i < b.N; i++ {
		s1 := make([]byte, 128)
		s1[0] = 0
	}
}

// 引用一个数组, 效率极高
func BenchmarkSliceRefArray(b *testing.B) {
	var a1 [128]byte
	for i := 0; i < b.N; i++ {
		s1 := a1[:]
		s1[0] = 0
	}
}


// --------------------------------------------------------------------------
/// @brief 数组和切边作为参数传递
// --------------------------------------------------------------------------
func PrintArray(arr [32]byte) 	{}
func PrintArrayAddr(arr *[32]byte) 	{}
func PrintSlice(arr []byte) 	{}

// 数组值传递，效率低
func BenchmarkArrayParameterPassing(b *testing.B) {
	b.StopTimer()
	var arr[32]byte
	for i, _ := range arr {
		arr[i] = byte(i);
	}
	b.StartTimer()

	for i := 0; i < b.N; i++ {
		PrintArray(arr);
	}
}

// 数组地址传递，效率高
func BenchmarkArrayParameterPassingPtr(b *testing.B) {
	b.StopTimer()
	var arr[32]byte
	for i, _ := range arr {
		arr[i] = byte(i);
	}
	b.StartTimer()

	for i := 0; i < b.N; i++ {
		PrintArrayAddr(&arr);
	}
}

// 切片一直是以地址传递，效率高
func BenchmarkSliceParameterPassing(b *testing.B) {
	b.StopTimer()
	s1 := make([]byte, 32)
	for i, _ := range s1 {
		s1 = append(s1, byte(i));
	}
	b.StartTimer()

	for i := 0; i < b.N; i++ {
		PrintSlice(s1);
	}
}

// --------------------------------------------------------------------------
/// 
// --------------------------------------------------------------------------


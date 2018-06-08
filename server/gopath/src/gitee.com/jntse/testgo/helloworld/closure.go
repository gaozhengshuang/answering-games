package main

import "fmt"

// --------------------------------------------------------------------------
/// @brief 闭包
// --------------------------------------------------------------------------
func TestClosure() {

	// 匿名函数
	n1, n2 := 10, 20
	var addfun = func(a int, b int) int {
		return a + b
	}
	fmt.Println("匿名函数求和", addfun(n1, n2))

	// 引用外部变量
	var modifyVariable = func() bool {
		n1 *= 10
		n2 *= 10
		return true
	}
	fmt.Printf("引用外部变量 n1=%d n2=%d ret:%t\n", n1, n2, modifyVariable())

	// 创建2个闭包，2个闭包有各自的环境
	var cl1 = MakeClosure(100)
	var cl2 = MakeClosure(200)
	fmt.Printf("cl1=%v cl1=%v\n", cl1(), cl1())
	fmt.Printf("cl2=%v cl2=%v\n", cl2(), cl2())

}

// 真正的闭包
func MakeClosure(i int) func() int {
	var sum int = 0
	return func() int {
		i++
		sum += i
		return sum
	}
}

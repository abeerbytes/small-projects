const products = [
            { id: 1, name: 'iPhone 15 Pro', price: 999, category: 'phones', icon: '📱' },
            { id: 2, name: 'Samsung Galaxy S24', price: 899, category: 'phones', icon: '📱' },
            { id: 3, name: 'MacBook Air M3', price: 1299, category: 'laptops', icon: '💻' },
            { id: 4, name: 'Dell XPS 15', price: 1499, category: 'laptops', icon: '💻' },
            { id: 5, name: 'AirPods Pro', price: 249, category: 'audio', icon: '🎧' },
            { id: 6, name: 'Sony WH-1000XM5', price: 399, category: 'audio', icon: '🎧' },
            { id: 7, name: 'iPad Pro 12.9', price: 1099, category: 'accessories', icon: '📲' },
            { id: 8, name: 'Apple Watch Ultra', price: 799, category: 'accessories', icon: '⌚' },
            { id: 9, name: 'Google Pixel 8', price: 699, category: 'phones', icon: '📱' },
            { id: 10, name: 'Surface Laptop 5', price: 999, category: 'laptops', icon: '💻' },
            { id: 11, name: 'Magic Keyboard', price: 149, category: 'accessories', icon: '⌨️' },
            { id: 12, name: 'Logitech MX Master', price: 99, category: 'accessories', icon: '🖱️' }
        ];

        let cart = [];
        let currentCategory = 'all';

        function loadCart() {
            const saved = localStorage.getItem('cart');
            if (saved) {
                cart = JSON.parse(saved);
                updateCartCount();
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function displayProducts(productsToShow) {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = productsToShow.map(product => 
                '<div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">' +
                    '<div class="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-5xl">' + product.icon + '</div>' +
                    '<div class="p-3">' +
                        '<div class="text-sm font-semibold mb-1 text-gray-800 truncate">' + product.name + '</div>' +
                        '<div class="text-lg font-bold text-purple-600 mb-2">$' + product.price + '</div>' +
                        '<button onclick="addToCart(' + product.id + ')" class="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition">Add to Cart</button>' +
                    '</div>' +
                '</div>'
            ).join('');
        }

        function filterCategory(category) {
            currentCategory = category;
            
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-purple-600', 'text-white');
                btn.classList.add('bg-gray-200');
            });
            event.target.classList.add('active', 'bg-purple-600', 'text-white');
            event.target.classList.remove('bg-gray-200');

            const filtered = category === 'all' 
                ? products 
                : products.filter(p => p.category === category);
            
            displayProducts(filtered);
        }

        function searchProducts() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query)
            );
            displayProducts(filtered);
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existing = cart.find(item => item.id === productId);

            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            saveCart();
            updateCartCount();
        }

        function updateCartCount() {
            const total = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = total;
        }

        function toggleCart() {
            const modal = document.getElementById('cartModal');
            if (modal.classList.contains('hidden')) {
                modal.classList.remove('hidden');
                modal.classList.add('flex', 'items-end', 'active');
                displayCart();
            } else {
                modal.classList.add('hidden');
                modal.classList.remove('flex', 'items-end', 'active');
            }
        }

        function closeCartOnBackdrop(event) {
            if (event.target === event.currentTarget) {
                toggleCart();
            }
        }

        function displayCart() {
            const container = document.getElementById('cartItems');
            
            if (cart.length === 0) {
                container.innerHTML = '<div class="text-center py-10 text-gray-400">Your cart is empty</div>';
                return;
            }

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.1;
            const total = subtotal + tax;

            container.innerHTML = cart.map(item =>
                '<div class="flex gap-4 mb-4 p-4 bg-gray-50 rounded-xl">' +
                    '<div class="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-3xl flex-shrink-0">' + item.icon + '</div>' +
                    '<div class="flex-1">' +
                        '<div class="font-semibold mb-1">' + item.name + '</div>' +
                        '<div class="text-purple-600 font-bold">$' + item.price + '</div>' +
                        '<div class="flex items-center gap-2 mt-2">' +
                            '<button onclick="changeQuantity(' + item.id + ', -1)" class="w-6 h-6 bg-purple-600 text-white rounded font-bold hover:bg-purple-700">-</button>' +
                            '<span class="text-sm">' + item.quantity + '</span>' +
                            '<button onclick="changeQuantity(' + item.id + ', 1)" class="w-6 h-6 bg-purple-600 text-white rounded font-bold hover:bg-purple-700">+</button>' +
                            '<button onclick="removeFromCart(' + item.id + ')" class="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">Remove</button>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            ).join('') +
            '<div class="bg-gray-100 p-5 rounded-xl mt-5">' +
                '<div class="flex justify-between mb-2 text-lg">' +
                    '<span>Subtotal:</span>' +
                    '<span>$' + subtotal.toFixed(2) + '</span>' +
                '</div>' +
                '<div class="flex justify-between mb-2 text-lg">' +
                    '<span>Tax (10%):</span>' +
                    '<span>$' + tax.toFixed(2) + '</span>' +
                '</div>' +
                '<div class="flex justify-between text-2xl font-bold text-purple-600 pt-2 border-t-2 border-gray-300">' +
                    '<span>Total:</span>' +
                    '<span>$' + total.toFixed(2) + '</span>' +
                '</div>' +
                '<button onclick="checkout()" class="w-full mt-4 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl text-lg font-bold hover:from-purple-700 hover:to-purple-900 transition">Checkout</button>' +
            '</div>';
        }

        function changeQuantity(productId, change) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                    updateCartCount();
                    displayCart();
                }
            }
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartCount();
            displayCart();
        }

        function checkout() {
            alert('Order placed successfully! Total: $' + 
                cart.reduce((sum, item) => sum + (item.price * item.quantity * 1.1), 0).toFixed(2));
            cart = [];
            saveCart();
            updateCartCount();
            toggleCart();
        }

        // Initialize
        loadCart();
        displayProducts(products);
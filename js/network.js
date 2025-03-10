// network.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  
    // Adjust canvas size to fill the section
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    // Determine node count based on screen size and device type
    let nodeCount;
    const isMobile = /Mobi|iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const width = window.innerWidth;
  
    if (isMobile || width < 768) {
      nodeCount = 50; // small screens
    } else if (width < 1200) {
      nodeCount = 150; // medium screens
    } else {
      nodeCount = 200; // large screens
    }
  
    const nodes = [];
    const maxDistance = 200; // maximum distance to draw a connection
    const baseColor = "#8B0000"; // dark red color
    let mouse = { x: -9999, y: -9999 };
  
    // Node class to define the nodes' behavior
    class Node {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        // Randomize initial angle for circular motion
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 2 + 1; // node size
        this.speed = 0.005 + Math.random() * 0.005; // angular speed
        // Additional movement for a more natural effect
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
      }
      update() {
        // Circular oscillation around the base position with extra displacement
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * 20 + this.vx;
        this.y = this.baseY + Math.sin(this.angle) * 20 + this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.fill();
      }
    }
  
    // Initialize nodes at random positions across the canvas
    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        nodes.push(new Node(x, y));
      }
    }
    initNodes();
  
    // Animation loop to update nodes and draw connections
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Update and draw each node
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
  
      // Draw connections between nodes that are within maxDistance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            // Calculate midpoint for mouse hover effect
            const mx = (nodes[i].x + nodes[j].x) / 2;
            const my = (nodes[i].y + nodes[j].y) / 2;
            let opacity = 0.2;
            const mouseDist = Math.sqrt((mx - mouse.x) ** 2 + (my - mouse.y) ** 2);
            if (mouseDist < 100) {
              opacity = 0.8;
            }
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = hexToRGBA(baseColor, opacity);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  
    // Utility function: convert hex color to rgba string
    function hexToRGBA(hex, alpha) {
      let r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  
    // Update mouse position for interactive effects
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  });
  
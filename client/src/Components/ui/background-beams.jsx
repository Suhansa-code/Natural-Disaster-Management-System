"use client";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className = "" }) => {
  const beams = useRef(null);

  useEffect(() => {
    if (!beams.current) return;

    const canvas = beams.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Node class
    class Node {
      constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = type === "command" ? 6 : 4;
        this.pulseRadius = this.radius;
        this.pulseOpacity = 1;
        this.connections = [];
      }

      draw(context) {
        // Base node
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.getColor();
        context.fill();

        // Pulsing ring
        context.beginPath();
        context.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(34, 197, 94, ${this.pulseOpacity})`;
        context.stroke();

        this.pulseRadius += 0.5;
        this.pulseOpacity -= 0.02;

        if (this.pulseOpacity <= 0) {
          this.pulseRadius = this.radius;
          this.pulseOpacity = 1;
        }
      }

      getColor() {
        switch (this.type) {
          case "command":
            return "#22c55e";
          case "medical":
            return "#ef4444";
          case "rescue":
            return "#eab308";
          case "supply":
            return "#3b82f6";
          default:
            return "#22c55e";
        }
      }
    }

    const nodes = [];
    const nodeTypes = ["command", "medical", "rescue", "supply"];
    nodes.push(new Node(canvas.width / 2, canvas.height / 2, "command"));

    // for (let i = 0; i < 15; i++) {
    //   const type = nodeTypes[Math.floor(Math.random() * 3) + 1];
    //   const angle = (Math.PI * 2 * i) / 15;
    //   const radius = Math.random() * (canvas.height / 3) + 100;
    //   const x = canvas.width / 2 + Math.cos(angle) * radius;
    //   const y = canvas.height / 2 + Math.sin(angle) * radius;
    //   nodes.push(new Node(x, y, type));
    // }

    for (let i = 0; i < 30; i++) {
      const type = nodeTypes[Math.floor(Math.random() * 3) + 1];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      nodes.push(new Node(x, y, type));
    }

    // Connect nodes
    nodes.forEach((node) => {
      if (node.type !== "command") {
        node.connections.push(nodes[0]);
        nodes[0].connections.push(node);
      }

      nodes.forEach((otherNode) => {
        if (node !== otherNode && node.type !== otherNode.type) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < canvas.height / 4) {
            node.connections.push(otherNode);
          }
        }
      });
    });

    let dataPackets = [];

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      nodes.forEach((node) => {
        node.connections.forEach((connectedNode) => {
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(connectedNode.x, connectedNode.y);
          context.strokeStyle = "rgba(34, 197, 94, 0.2)";
          context.lineWidth = 1;
          context.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => node.draw(context));

      // Generate new data packets
      if (Math.random() < 0.1) {
        const sourceNode = nodes[0];
        const targetNode =
          nodes[Math.floor(Math.random() * (nodes.length - 1)) + 1];
        dataPackets.push({
          x: sourceNode.x,
          y: sourceNode.y,
          targetNode,
          progress: 0,
        });
      }

      // Animate data packets
      dataPackets = dataPackets.filter((packet) => {
        packet.progress += 0.02;

        if (packet.progress >= 1) return false;

        const { x: tx, y: ty } = packet.targetNode;
        packet.x = nodes[0].x + (tx - nodes[0].x) * packet.progress;
        packet.y = nodes[0].y + (ty - nodes[0].y) * packet.progress;

        context.beginPath();
        context.arc(packet.x, packet.y, 2, 0, Math.PI * 2);
        context.fillStyle = "#22c55e";
        context.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={beams}
      className={`absolute inset-0 z-0 ${className}`}
      style={{
        mixBlendMode: "screen",
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    />
  );
};

---
title: 'Routing Protocol : The Invisible force that powers the interent'
slug: routing-protocol-the-invisible-force-that-powers-the-internet
publishedAt: '2021-12-31'
description: 'An Introduction on Routing Protocol and how IP data packets are sent over the Internet.'
banner: 'nilaysharan/blog/router_protocol/banner'
tags: 'tech,network'
---

## What is Routing?

Routing is the process of selecting a path across one or more networks. This selection is based on routing metrics, policies, or algorithms. Routing is vital for various networks, including circuit-switching networks, packet-switched networks, telephone networks, and even public transportation systems. On the internet, routing is performed by specialized computers known as routers.

![Routing Diagram](https://cf-assets.www.cloudflare.com/slt3lc6tev37/5biqo5wm6nM8GSmiNyiAnl/b6b5c9befeda6ba99b4380d84953de18/routing-diagram.svg)

Consider a scenario where a data packet needs to travel from Computer A to Computer B. The decision about the route is critical. Should the packet pass through networks 1, 3, and 5 or networks 2 and 4? While networks 2 and 4 represent a shorter path, networks 1, 3, and 5 might have faster packet forwarding capabilities. Routers make these decisions, ensuring efficient data transmission.

Routing on the internet involves intricate calculations to optimize the path, balancing factors like distance, speed, and network congestion. Routers play a crucial role in directing data packets along the most efficient route, ensuring timely and accurate delivery between source and destination.

## How does Routing Work?

Routing algorithms play a pivotal role in determining the specific route for data packets. Each router possesses an internal routing table, and based on the routing algorithm it employs, it forwards packets to the next best network on the way to their final destination.

### Routing Table Dynamics

The routing table contains crucial information about the network's topology, first among its immediate neighbors and then throughout the entire network. These tables are dynamic and constantly updated as routers forward packets and communicate changes within the network.

**Prior Knowledge and Network Topology**

Each router has prior knowledge limited to networks directly attached to it. Through this direct connection, routers gain insights into the network's topology. This localized knowledge is fundamental for making routing decisions.

**Dynamic Routing vs. Static Routing**

Routing tables can be either static or dynamic.

- **Static Routing Tables:** These tables are manually configured by a network administrator. Entries are added and maintained through human intervention. Static routes remain constant unless an administrator changes them. This predictability can be advantageous in stable networks.

- **Dynamic (Adaptive) Routing Tables:** In contrast, dynamic routing tables are built and maintained by routing protocols running on network devices. These protocols facilitate communication among routers, enabling them to exchange real-time information about network topology. Dynamic routing protocols automatically adapt to changing network conditions, allowing routers to choose the best route between any two nodes. This adaptability is crucial for large and complex networks where frequent changes occur.

### Fault Tolerance and High Availability

The ability of routing protocols to dynamically adjust to changing conditions, such as disabled connections and network component failures, is what provides the internet with its fault tolerance and high availability. By rerouting data around obstructions and optimizing the path based on real-time data, the internet maintains its functionality even in the face of challenges.

In practical network setups, a combination of static and dynamic routing is often used. Static routes can be employed for specific, well-defined paths, while dynamic routing protocols manage the bulk of the network traffic, adapting to changes and ensuring efficient packet delivery in dynamic environments.

## Typical Fields in a Routing Table

A routing table is a critical data structure in networking, utilized by routers and network devices to determine the appropriate next hop or interface for forwarding packets. These tables contain several essential fields that enable routers to make intelligent decisions about packet forwarding within a network. Let's explore the typical fields found in a routing table:

1. **Destination IP Address:**

   - This field indicates the destination IP address or a range of IP addresses for which the routing information is applicable. It defines the network or host to which the route points.

2. **Subnet Mask:**

   - The subnet mask is used to determine the network portion of the destination IP address. It helps routers differentiate between the network and host parts of an IP address, allowing for proper routing decisions.

3. **Next Hop Address:**

   - The next hop address specifies the IP address of the next router or intermediary device to which the packet should be forwarded. If the destination IP address is on a directly connected network, the next hop address might be the IP address of the destination host or network.

4. **Interface:**

   - This field specifies the network interface (e.g., Ethernet, Wi-Fi) through which the packet should be sent. It indicates the physical or logical connection used to reach the next hop or destination.

5. **Flags:**
   - Flags provide additional information about the route. Common flags include:
     - **U (Up):** Indicates that the router is up and operational.
     - **G (Gateway):** Denotes that the destination is in another network, and a gateway/router is needed to reach it.
     - **H (Host-Specific Address):** Specifies that the route is for a specific host, not an entire network.
     - **D (Added by Redirection):** Indicates that the route was added by a redirection.
     - **M (Modified by Redirection):** Denotes that the route was modified by a redirection.

These fields together allow routers to determine the most efficient and accurate route for forwarding packets within a network. By analyzing destination IP addresses, subnet masks, next hop addresses, interface details, and route-specific flags, routers ensure that data packets are delivered to their intended destinations, even in complex network environments.

## Routing Protocols

![flowchart for routing protocols](https://res.cloudinary.com/di1h27v1s/image/upload/v1697849493/nilaysharan/blog/router_protocol/hi7dicuaxe0yvrokcfga.png)

## Border Gateway Protocol (BGP)

Border Gateway Protocol (BGP) is the protocol for routing data packets between Autonomous Systems (ASes). ASes announce their routing policies to other ASes and routers via BGP. Without this routing information, operating the Internet on a large scale would quickly become impractical; data packets would get lost or take too long to reach their destinations.

### BGP Functionality

BGP routers play a vital role in the functioning of the Internet:

- **Announcement of IP Addresses:** Each AS uses BGP to announce the IP addresses they are responsible for and the other ASes they connect to.
- **Routing Tables:** BGP routers collect information from ASes globally and store it in routing tables. These tables help determine the fastest paths from one AS to another.
- **Routing Decisions:** When packets arrive, BGP routers consult their routing tables to determine the next AS the packet should be forwarded to.

### BGP vs. IP

IP (Internet Protocol) specifies the destination for each packet, but BGP directs packets on the fastest route to their destination. Without BGP, IP packets would travel randomly from AS to AS, similar to a driver guessing which roads to take.

### Operators of BGP Autonomous Systems

BGP Autonomous Systems (ASes) are typically operated by Internet service providers (ISPs), large tech companies, universities, government agencies, and scientific institutions. Each AS must have a registered Autonomous System Number (ASN) assigned by the Internet Assigned Numbers Authority (IANA) and Regional Internet Registries (RIRs).

### Internal BGP vs. External BGP

- **External BGP (eBGP):** Routes are exchanged and traffic is transmitted over the Internet using eBGP.
- **Internal BGP (iBGP):** ASes can use an internal version of BGP to route within their networks. iBGP is not a requirement for eBGP and ASes can choose various internal protocols for internal network routing.

### BGP Attributes

BGP assigns attributes to each path, aiding routers in selecting paths when multiple options exist. Some key BGP attributes include:

- **Weight:** A Cisco-proprietary attribute that indicates preferred local paths.
- **Local Preference:** Informs a router which outbound path to select.
- **Originate:** Instructs a router to choose routes it added to BGP itself.
- **AS Path Length:** Specifies preference for shorter paths.

### BGP Flaws and Security Concerns

BGP is vulnerable to hijacking, where incorrect routes are advertised, leading to various attacks:

- **Phishing and Social Engineering:** Redirecting users to fake websites.
- **Denial-of-Service (DoS):** Traffic blackholing or redirection.
- **On-Path Attacks:** Modifying exchanged data and subverting filtering systems.
- **Impersonation Attacks:** Eavesdropping on communications.

These incidents occur due to BGP's reliance on trust. When peers announce incorrect route information, traffic may be redirected, leading to potentially malicious outcomes.

## Routing Information Protocol (RIP)

The Routing Information Protocol (RIP) utilizes "hop count" to determine the shortest path from one network to another. In this context, "hop count" refers to the number of routers a packet must pass through on its way from one network to another. Each transition between networks is referred to as a "hop."

### Key Aspects of RIP

- **Distance Vector Routing:** RIP employs distance vector routing, where routes are determined based on the number of hops between routers.
- **Table Entry Updates:** RIP routers update their routing tables using values received from neighboring routers. These updates help maintain an accurate view of the network topology.
- **Timers for Link Detection:** RIP routers use timers to detect failed links. If a link goes down, routers can adjust their routing tables accordingly.
- **First Generation ARPANET:** RIP was utilized in the first generation of ARPANET, the precursor to the modern internet.

### Challenges and Drawbacks

RIP faces several challenges, including:

1. **Slow Convergence for Larger Networks:** In larger networks, RIP's convergence can be slow, meaning it takes time for all routers to update their routing tables after a change in the network.
2. **Delayed Awareness of Network Inaccessibility:** If a network becomes inaccessible, it might take a considerable amount of time for other routers to recognize this change and update their routing tables.
3. **Routing Table Updates:** The method of updating routing tables using distance vectors can lead to inefficiencies, especially after numerous message transfers.
4. **Routing Loops Detection:** Detecting routing loops can take a significant amount of time in RIP-based networks.
5. **Bandwidth Consumption:** RIP's routing updates can consume substantial bandwidth, particularly in networks with frequent changes.

These challenges highlight the limitations of RIP in managing dynamic and large-scale networks.

## Open Shortest Path First (OSPF)

OSPF (Open Shortest Path First) is a prominent member of IP Routing protocols, specifically categorized as an Interior Gateway Protocol (IGP) for the Internet. It is designed to distribute IP routing information within a single Autonomous System (AS) in an IP network.

### Key Characteristics of OSPF

- **Link-State Routing Protocol:** OSPF operates as a link-state routing protocol, wherein routers exchange detailed topology information with their nearest neighbors. This information is disseminated throughout the AS, enabling every router to possess a comprehensive understanding of the AS's topology. The routers leverage this data to calculate end-to-end paths through the AS, usually employing a variant of the Dijkstra algorithm. Consequently, the next hop address for forwarding data is determined by selecting the optimal end-to-end path to the final destination.

- **Complete Topological Knowledge:** The primary advantage of OSPF lies in its ability to provide routers with complete knowledge of the network's topology. This knowledge empowers routers to compute routes that meet specific criteria, enabling functionalities like traffic engineering where routes can be tailored to fulfill particular quality of service requirements.

- **Scalability Challenges:** Despite its advantages, OSPF faces scalability challenges. As the number of routers within the routing domain increases, the size and frequency of topology updates, as well as the time required to compute end-to-end routes, also increase. This lack of scalability makes OSPF unsuitable for routing across the broader Internet, restricting its use to routing traffic within a single AS.

- **Link State Advertisement (LSA) Messages:** OSPF routers share information about their local state, such as usable interfaces, reachable neighbors, and interface costs, through LSA messages. Routers utilize these messages to construct a unified database that describes the AS's topology.

- **Routing Table Calculation:** Based on the database, each router calculates its routing table using the Shortest Path First (SPF) or Dijkstra algorithm. This routing table includes all known destinations associated with a next hop IP address and outgoing interface.

- **Dynamic Recalculation:** OSPF dynamically recalculates routes in response to network topology changes using the Dijkstra algorithm. It minimizes the generated routing protocol traffic.

- **Support for Equal-Cost Multipath:** OSPF provides support for multiple paths of equal cost, enhancing network efficiency and fault tolerance.

- **Multi-Level Hierarchy (Area Routing):** OSPF employs a multi-level hierarchy, specifically a two-level structure, known as "area routing." Within this structure, information about the topology within a defined area of the AS is concealed from routers outside the area. This setup enhances routing protection and reduces routing protocol traffic.

- **Authentication:** All OSPF protocol exchanges can be authenticated, ensuring that only trusted routers can participate in the routing exchanges for the AS.

## OSPF Version 3 (OSPFv3)

OSPFv3 is a significant extension of OSPF, specifically tailored to be compatible with IPv6's expansive 128-bit address space. It brings forth several crucial changes and enhancements, ensuring seamless integration with the evolving networking landscape. Below are the key features and modifications introduced in OSPFv3:

- **Per-Link Processing:** OSPFv3 adopts per-link processing, a departure from the per-subnet approach in OSPFv2. This shift allows for more granular and efficient routing decisions based on individual links within a network.

- **Flooding Scope:** OSPFv3 incorporates the concept of flooding scope, which can be categorized as link-local, area-wide, or AS-wide. This distinction enables precise control over the dissemination of routing information, ensuring that updates are confined to the intended scope, be it a specific link, an area, or the entire AS.

- **Removal of Opaque LSAs:** Unlike OSPFv2, OSPFv3 does away with opaque LSAs (Link-State Advertisements). Opaque LSAs were used in OSPFv2 to carry additional information beyond standard routing data. In OSPFv3, this functionality is redefined and integrated into the protocol's core specifications.

- **Support for Multiple OSPF Instances per Link:** OSPFv3 introduces the capability to support multiple instances of OSPF on a single link. This flexibility allows networks to accommodate diverse routing requirements within the same infrastructure, enhancing scalability and adaptability.

- **Packet and LSA Format Modifications:** OSPFv3 incorporates various packet and LSA format changes, aligning the protocol with the specific demands of IPv6 addressing and routing. These modifications optimize the protocol's performance and ensure seamless communication in IPv6-enabled environments.

Both OSPFv2 and OSPFv3 are fully supported by DC-OSPF, facilitating the coexistence of IPv4 and IPv6 networks within the same OSPF framework. OSPFv3's enhancements not only address the challenges posed by IPv6's extended address space but also provide a robust foundation for modern and future-ready networking infrastructures.

## Conclusion

In the ever-expanding landscape of computer networking, routing protocols play a pivotal role in ensuring seamless data transmission across diverse networks. From the foundational principles of routing to the intricacies of advanced protocols like OSPFv3, the journey through this document has shed light on the fundamental concepts and complexities that govern modern networking infrastructures.

Routing, at its core, is about determining the most efficient path for data packets to travel from source to destination. It involves a complex interplay of algorithms, tables, and protocols, each designed to optimize the flow of information. Whether it's the simplicity of hop count-based routing in RIP or the sophistication of link-state algorithms in OSPF and BGP, these protocols are the lifeblood of the Internet and interconnected networks worldwide.

Understanding the nuances of routing protocols is not merely an academic pursuit but a practical necessity for network administrators, engineers, and anyone involved in the realm of IT. As technology continues to evolve, so do the challenges and opportunities in the field of networking. The ability to grasp the intricacies of routing protocols ensures that networks remain efficient, secure, and capable of adapting to the ever-changing demands of the digital age.

As we conclude this exploration, it's evident that the world of routing protocols is both vast and intricate, yet essential for the seamless functioning of our interconnected world. Whether you are delving into the basics of RIP or grappling with the complexities of OSPFv3, the knowledge gained here serves as a foundation for building robust, efficient, and future-ready networks, bridging the gaps in the global web of communication.

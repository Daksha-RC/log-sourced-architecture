---
title: Building Software on Immutable Facts (4 of 8)
description: "Access Should Not Depend on Synchronization"
---

In the previous article, we explored how facts and reasoning provide the foundation for explainable systems.

But explainability is only valuable if the information required to explain outcomes is actually available.

This leads to another question:

**Why do so many systems require synchronization before information becomes accessible?**

In modern architectures, access to information is often delayed by replication, transformation, indexing, and movement across systems.

We have become so accustomed to these patterns that we rarely question them.

Perhaps we should.

## The Replication Reflex

A familiar pattern exists in most organizations.

An operational system captures information.

That information is then copied into:

* Search platforms
* Data warehouses
* Data lakes
* Analytics engines
* AI platforms
* Reporting systems

Each destination serves a different purpose.

Each introduces another synchronization path.

Over time, the architecture becomes a network of pipelines designed to move information from one place to another.

The assumption behind this approach is simple:

To make information useful, we must first copy it.

## The Cost of Waiting

Synchronization is rarely instantaneous.

Data must be captured.

Pipelines must execute.

Indexes must refresh.

Materialized views must update.

Caches must warm.

Consumers often wait minutes, hours, or even days before information becomes available.

For analytical workloads this delay is often accepted.

For operational decision-making and AI-driven systems, it can become a significant limitation.

The problem is not merely latency.

The problem is that access depends on successful synchronization.

If a pipeline fails, access fails.

If replication lags, consumers see outdated information.

If transformations break, trust erodes.

Access becomes coupled to movement.

## Facts Should Be Available

The purpose of facts is not simply to preserve history.

The purpose is to make knowledge available.

Operational systems require access.

Analytical systems require access.

AI systems require access.

Future systems that do not yet exist will require access.

The architectural challenge is not how to move facts everywhere.

The challenge is how to make facts available wherever they are needed.

This is a subtle but important distinction.

One approach optimizes movement.

The other optimizes accessibility.

## Different Consumers, Different Needs

Not every consumer requires information in the same way.

An operational service may need low-latency access to current state.

An analyst may need years of historical information.

An AI system may require both history and context.

A data scientist may need bulk access to millions of records.

A compliance team may need complete traceability.

The diversity of access patterns is not a problem.

It is a reality.

Architectures should adapt to consumers rather than forcing consumers to adapt to architectural constraints.

## Accessibility as an Architectural Property

We often discuss scalability, availability, and reliability as architectural properties.

Accessibility deserves similar attention.

Information should not become inaccessible because it resides in the wrong system.

It should not require specialized pipelines to reach every consumer.

It should not depend on a particular analytical platform, search engine, or AI stack.

Facts should be available at the speed and scale demanded by their consumers.

Not because they have been copied everywhere, but because accessibility was treated as a first-class architectural concern.

## Beyond Operational Systems

Historically, accessibility was viewed primarily through the lens of applications and databases.

Today the landscape is much broader.

Analytical workloads need direct access to facts.

Machine learning workflows need direct access to facts.

AI systems increasingly need direct access to facts.

As organizations adopt new technologies, the number of consumers continues to grow.

The ability to make information available without continuously multiplying synchronization paths becomes increasingly important.

## Looking Ahead

Accessibility solves only part of the challenge.

Even when facts are available, organizations remain dependent on the technologies used to store and process them.

Databases are replaced.

Cloud providers change.

Analytics platforms evolve.

AI models come and go.

Yet the underlying facts often remain valuable for decades.

In the next article, we'll explore why facts should outlive technology and why portability may be one of the most important architectural properties for long-lived systems.

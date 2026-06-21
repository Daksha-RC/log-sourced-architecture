---
title: Building Software on Immutable Facts (2 of 8)
description: "The Cost of Fragmented Truth"
---

In the previous article, we explored the distinction between state and facts.

State represents our current understanding of reality.

Facts represent the record of reality itself.

If facts are the foundation of software, a natural question follows:



:::note
**What happens when facts become fragmented across systems?**

> Synchronization becomes the architecture.
:::




## The Growth of Modern Systems

Most systems begin with a single application and a single database.

At this stage, life is relatively simple.

As requirements grow, additional systems appear:

* Search indexes for discovery
* Caches for performance
* Warehouses for reporting
* Data lakes for analytics
* Feature stores for machine learning
* Knowledge bases for AI applications

Each system serves a legitimate purpose.

Each system requires access to information.

The challenge is that information rarely stays in one place.

It is copied, transformed, replicated, enriched, indexed, aggregated, and redistributed.

Soon, the organization is maintaining multiple representations of the same underlying facts.

## The Hidden Architecture

Ask an engineering team to describe their architecture and they will often draw applications, services, APIs, and databases.

What is rarely drawn is the growing network of synchronization mechanisms connecting them.

- ETL pipelines.

- CDC streams.

- Replication jobs.

- Message brokers.

- Materialized views.

- Cache refresh mechanisms.

- Search indexing pipelines.

- Feature generation workflows.

These systems often consume more engineering effort than the business logic they support.

Over time, the architecture becomes less about processing facts and more about keeping representations aligned.

## Fragmentation Creates Uncertainty

Consider a simple customer order.

> The operational system says the order is shipped.

> The warehouse says it is pending.

> The analytics platform reports a delay.

> The customer service portal shows outdated information.

Which system is correct?

The answer is often unclear.

Not because the business process is complicated, but because facts have become fragmented across multiple systems moving at different speeds.

Every copy introduces the possibility of divergence.

Every synchronization path introduces another point of failure.

As systems scale, maintaining consistency becomes increasingly difficult.

## The Cost of Copying Truth

Replication is often treated as a technical concern.

In reality, it has significant organizational consequences.

Teams become responsible for maintaining pipelines rather than delivering business value.

Operational decisions depend on stale data.

Analytics teams spend time reconciling discrepancies.

AI systems operate on incomplete context.

Architectural complexity grows not because facts are difficult to process, but because facts have been separated from one another.

The result is an architecture optimized for moving truth rather than using it.

## Independence Without Fragmentation

The solution is not centralization.

Domains should remain autonomous.

Services should evolve independently.

Teams should own their systems.

Architectural boundaries are valuable.

The challenge is ensuring that boundaries do not fragment facts.

Organizations should be able to evolve applications, services, and technologies independently while preserving a coherent view of reality.

Independence and consistency should not be opposing goals.

## A Different Perspective

Many architectural discussions focus on distributing computation.

Perhaps we should spend more time thinking about preserving coherence.

The question is not:

"How do we move data between systems?"

The question is:

"How do we prevent facts from becoming fragmented in the first place?"

The distinction is subtle, but important.

One approach accepts fragmentation and attempts to manage it.

The other treats coherence as a fundamental architectural concern.

## Looking Ahead

Facts alone are not enough to understand outcomes.

Organizations also apply policies, rules, models, and human judgment.

A fact may explain what happened.

It does not always explain why it happened.

In the next article, we'll explore why explainability requires both facts and reasoning, and why understanding outcomes is becoming increasingly important in the age of AI.

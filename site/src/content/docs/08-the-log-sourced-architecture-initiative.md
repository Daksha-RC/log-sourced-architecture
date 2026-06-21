---
title: Building Software on Immutable Facts (8 of 8)
description: "The Log-Sourced Architecture Initiative"
---

Throughout this series, we have explored a simple observation:

**Facts often outlive the systems that produce and consume them.**

Applications are rewritten.

Databases are replaced.

Cloud providers change.

Analytics platforms evolve.

AI models come and go.

Yet the facts describing customers, transactions, decisions, interactions, and operations frequently remain valuable for decades.

This observation has far-reaching implications.

If facts are the most durable asset in a software system, should they not occupy a more central role in architecture?

We believe the answer is yes.

## A Common Pattern

The challenges facing modern systems often appear unrelated.

Organizations struggle with:

* Data synchronization
* Explainability
* Data lineage
* Vendor lock-in
* AI grounding
* Auditability
* Historical analysis
* System integration

These are usually treated as separate problems requiring separate solutions.

But viewed through the lens of immutable facts, a common pattern emerges.

Most of these challenges arise because facts become fragmented, hidden behind state, tightly coupled to technology, or lost as systems evolve.

The problem is not a lack of tools.

The problem is the absence of a coherent architectural foundation.

## Facts as the Foundation

Traditional architectures tend to place state at the center.

State is optimized.

State is replicated.

State is synchronized.

State becomes the primary representation of truth.

This approach has served the industry well, but it comes with increasing complexity as systems become more distributed, analytical, and AI-driven.

A fact-centric architecture takes a different perspective.

Facts become the enduring asset.

State becomes a derived representation.

Reasoning becomes observable.

History becomes valuable.

Technology becomes replaceable.

The focus shifts from preserving state to preserving facts.

## A Coherent Approach to Systems Architecture

Over the previous seven articles, several recurring principles emerged.

Systems should evolve without fragmenting facts.

Outcomes should be explainable through facts and reasoning.

Facts should be available wherever they are needed.

Facts should outlive technologies.

History should be preserved rather than discarded.

AI should reason from facts rather than reconstruct them.

Individually, these ideas address specific challenges.

Collectively, they describe a broader architectural philosophy.

We call this philosophy **Log-Sourced Architecture**.

## The Log-Sourced Architecture Initiative

**State is transient. Facts endure. Modern software should be built on facts.**

Today's systems scatter truth across databases, services, warehouses, caches, search engines, event buses, and AI platforms.

As systems grow, synchronization becomes the architecture.

**We believe that a coherent approach to systems architecture is needed to establish facts as the foundation of software.**

### Log-Sourced Systems are Unified

Domains, services, and teams should evolve independently without fragmenting facts.

State, reasoning, projections, analytics, and AI context are derived from facts.

### Log-Sourced Systems are Inspectable

Every state and projection can be traced to the facts and reasoning that produced it.

Nothing is a black box.

### Log-Sourced Systems are Accessible

Facts should be available where they are needed.

State, projections, and history should be accessible at the speed and scale demanded by their consumers.

### Log-Sourced Systems are Portable

Facts outlive databases, cloud providers, storage engines, analytics platforms, and AI models.

Facts are permanent. Implementations are temporary.

### Log-Sourced Systems are Immutable

New knowledge is added to history rather than replacing it.

The past is never lost. It can be replayed.

## A Beginning, Not a Conclusion

The purpose of this initiative is not to prescribe a specific database, platform, storage engine, programming model, or vendor.

Nor is it intended to replace every architectural style that came before it.

Instead, it offers a perspective:

That facts are more enduring than state.

That history is valuable.

That reasoning should be observable.

That accessibility should not depend on synchronization.

That technology should remain replaceable.

And that software systems should be designed around the assets that outlive their implementations.

The principles described here are intended as a starting point for discussion, experimentation, and refinement.

The technologies we use will continue to evolve.

The facts upon which our organizations operate will remain.

The future of software may not be built around state.

It may be built around immutable facts.

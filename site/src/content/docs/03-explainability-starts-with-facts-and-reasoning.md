---
title: Building Software on Immutable Facts (3 of 8)
description: "Explainability Starts with Facts and Reasoning"
---

In the previous article, we explored how the fragmentation of facts creates synchronization challenges across modern systems.

But even when facts are available, another question remains:

**Can we explain why an outcome occurred?**

As systems become increasingly automated, this question is no longer optional.

Customers ask it.

Auditors ask it.

Regulators ask it.

Engineers ask it.

Increasingly, AI systems force us to ask it as well.

Understanding what happened is important.

Understanding why it happened is becoming essential.

## State Explains Very Little

Most systems are optimized to answer questions about current state.

What is the account balance?

What is the inventory level?

What is the customer's status?

What is the risk score?

These questions are important, but they rarely explain how an outcome was produced.

A rejected loan application, for example, cannot be fully explained by its current status.

Neither can a fraud alert, a pricing recommendation, or a denied insurance claim.

State tells us the result.

It does not necessarily tell us the reasoning behind the result.

## Facts Tell Us What Happened

Facts provide context.

A customer submitted an application.

Income information was provided.

A credit report was received.

Additional documents were requested.

A risk assessment was performed.

These facts help reconstruct the sequence of events that led to an outcome.

But even facts have limitations.

Knowing what happened does not always explain why a particular decision was made.

For that, we need to understand the reasoning.

## Reasoning Explains Outcomes

Organizations continuously apply reasoning.

Policies determine eligibility.

Rules determine compliance.

Models generate predictions.

Algorithms rank recommendations.

Humans exercise judgment.

Reasoning transforms facts into outcomes.

When reasoning is hidden inside application code, spreadsheets, machine learning models, or external systems, explainability becomes difficult.

The outcome remains visible.

The path that produced it often does not.

This creates challenges for debugging, governance, compliance, and trust.

## The Growing Importance of Explainability

Historically, explainability was often treated as a specialized requirement.

Today it is becoming a universal one.

Organizations increasingly depend on automated decision-making.

At the same time, they face growing expectations for transparency.

Customers want explanations.

Regulators demand accountability.

Engineers need reproducibility.

AI systems require provenance.

The question is no longer whether outcomes should be explainable.

The question is whether our architectures make explainability possible.

## Explainability Is an Architectural Concern

Explainability is often approached as a reporting problem.

Generate an audit trail.

Capture logs.

Store debugging information.

Record model metadata.

While useful, these approaches are frequently added after the fact.

A more fundamental approach is to treat explainability as an architectural property.

If facts are preserved and reasoning is observable, outcomes become understandable.

State can be traced back to the facts and reasoning that produced it.

Projections can be validated against their origins.

Unexpected behavior can be investigated systematically.

Nothing becomes a black box.

## Facts and Reasoning Together

Facts establish reality.

Reasoning explains outcomes.

Neither is sufficient on its own.

Facts without reasoning may tell us what happened but not why.

Reasoning without facts lacks context and evidence.

Together, they provide a foundation for understanding how systems behave.

As software becomes more distributed, automated, and AI-driven, this combination becomes increasingly important.

Not simply for compliance.

Not simply for debugging.

But for trust.

## Looking Ahead

Modern systems spend enormous effort moving information between applications, warehouses, search engines, analytics platforms, and AI systems.

Much of this movement exists because consumers need access to information in different forms and at different scales.

But should access depend on synchronization?

In the next article, we'll explore why facts should be available where they are needed and why accessibility may be one of the most overlooked architectural properties in modern software.

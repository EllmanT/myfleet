const express = require("express");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Job = require("../model/job");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Deliverer = require("../model/deliverer");
const Contractor = require("../model/contractor");
const DriverStats = require("../model/driverStats");
const VehicleStats = require("../model/vehicleStats");
const OverallStats = require("../model/overallStats");
const ContractorStats = require("../model/contractorStats");
const Driver = require("../model/driver");
const Vehicle = require("../model/vehicle");
const router = express.Router();

// ...
//creating the job
router.post(
  "/create-job",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const jobs = req.body;

      const driverIds = new Set();
      const vehicleIds = new Set();
      const bulkDriverStats = [];
      const bulkVehicleStats = [];
      const bulkOverallStats = [];
      const bulkContractorStats = [];
      const jobIds = [];

      const deliverer = await Deliverer.findById(req.user.companyId);

      if (!deliverer) {
        return next(new ErrorHandler("Deliverer not found", 500));
      }
      const delivererId = req.user.companyId;
      const totalCustomers = deliverer.customer_ids.length;
      const totalContractors = deliverer.contractor_ids.length;
      const companyId = req.user.companyId;
      let year;
      let contractorId;
      contractorId = jobs[0].contractorId;
      const vehicleId = jobs[0].vehicleId;
      const driverId = jobs[0].driverId;

      const contractor = await Contractor.findById(contractorId);
      const vehicle = await Vehicle.findById(vehicleId);
      const driver = await Driver.findById(driverId);
      const contractorName = contractor.companyName;

      for (const job of jobs) {
        const newJob = new Job(job);
        const date = new Date(job.orderDate);
        year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" }); // Get month name
        const distance = job.distance;
        const cost = job.cost;

        if (!driverId || !vehicleId || !companyId || !year || !distance) {
          console.log("Invalid job data:", job);
          continue; // Skip this job and proceed to the next iteration
        }

        driverIds.add(driverId);
        vehicleIds.add(vehicleId);
        //START OF THE DRIVERSTATS UPDATING
        //Updating the monthly data and soring
        bulkDriverStats.push({
          updateOne: {
            filter: { driverId, year },
            update: {
              $inc: {
                yearlyMileage: distance,
                yearlyRevenue: cost,
                yearlyProfit: cost,
                yearlyExpenses: 0,
                [`revenueByContractor.${contractorName}`]: cost,
                [`jobsByContractor.${contractorName}`]: 1,
                // yearlyJobs: 1, // Increment yearlyJobs by 1
              },
              $setOnInsert: {
                monthlyData: [],
                dailyData: [],
                yearlyJobs: 1,
              },
            },
            upsert: true,
          },
        });

        bulkDriverStats.push({
          updateOne: {
            filter: { driverId, year, "monthlyData.month": month },
            update: {
              $inc: {
                yearlyJobs: 1,
                "monthlyData.$.totalMileage": distance,
                "monthlyData.$.totalRevenue": cost,
                "monthlyData.$.totalProfit": cost,
                "monthlyData.$.totalExpenses": 0,
                "monthlyData.$.totalJobs": 1,
              },

              arrayFilters: [{ "elem.month": month }],
            },
          },
        });

        bulkDriverStats.push({
          updateOne: {
            filter: { driverId, year, "monthlyData.month": { $ne: month } },
            update: {
              $push: {
                monthlyData: {
                  $each: [
                    {
                      month,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalProfit: cost,
                      totalExpenses: 0,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { month: -1 },
                },
              },
            },
          },
        });
        //Updating the daily data and soring
        bulkDriverStats.push({
          updateOne: {
            filter: { driverId, year, "dailyData.date": date },
            update: {
              $inc: {
                "dailyData.$.totalMileage": distance,
                "dailyData.$.totalRevenue": cost,
                "dailyData.$.totalJobs": 1,
              },
            },
          },
        });

        bulkDriverStats.push({
          updateOne: {
            filter: {
              driverId,
              year,
              "dailyData.date": { $ne: date },
            },
            update: {
              $push: {
                dailyData: {
                  $each: [
                    {
                      date,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { date: -1 },
                },
              },
            },
          },
        });

        //END OF THE DRIVERSTATS UPDATING

        //START OF THE VEHICLESTATS UPDATING

        bulkVehicleStats.push({
          updateOne: {
            filter: { vehicleId, year },
            update: {
              $inc: {
                yearlyMileage: distance,
                yearlyRevenue: cost,
                yearlyProfit: cost,
                yearlyExpenses: 0,
                [`revenueByContractor.${contractorName}`]: cost,
                [`jobsByContractor.${contractorName}`]: 1,
                // yearlyJobs: 1, // Increment yearlyJobs by 1
              },
              $setOnInsert: {
                monthlyData: [],
                dailyData: [],
                yearlyJobs: 1,
              },
            },
            upsert: true,
          },
        });

        bulkVehicleStats.push({
          updateOne: {
            filter: { vehicleId, year, "monthlyData.month": month },
            update: {
              $inc: {
                yearlyJobs: 1,
                "monthlyData.$.totalMileage": distance,
                "monthlyData.$.totalRevenue": cost,
                "monthlyData.$.totalProfit": cost,
                "monthlyData.$.totalExpenses": 0,
                "monthlyData.$.totalJobs": 1,
              },

              arrayFilters: [{ "elem.month": month }],
            },
          },
        });

        bulkVehicleStats.push({
          updateOne: {
            filter: { vehicleId, year, "monthlyData.month": { $ne: month } },
            update: {
              $push: {
                monthlyData: {
                  $each: [
                    {
                      month,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalProfit: cost,
                      totalExpenses: 0,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { month: -1 },
                },
              },
            },
          },
        });
        //Updating the daily data and soring
        bulkVehicleStats.push({
          updateOne: {
            filter: { vehicleId, year, "dailyData.date": date },
            update: {
              $inc: {
                "dailyData.$.totalMileage": distance,
                "dailyData.$.totalRevenue": cost,
                "dailyData.$.totalJobs": 1,
              },
            },
          },
        });

        bulkVehicleStats.push({
          updateOne: {
            filter: {
              vehicleId,
              year,
              "dailyData.date": { $ne: date },
            },
            update: {
              $push: {
                dailyData: {
                  $each: [
                    {
                      date,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { date: -1 },
                },
              },
            },
          },
        });

        //END OF THE  VEHICLESTATS UPDATING

        //START OF THE CONTRACTORSTATS UPDATING
        //Updating the monthly data and soring
        bulkContractorStats.push({
          updateOne: {
            filter: { contractorId, delivererId, year },
            update: {
              $inc: {
                yearlyMileage: distance,
                yearlyRevenue: cost,
              },
              $setOnInsert: {
                monthlyData: [],
                dailyData: [],
                yearlyJobs: 1,
              },
            },
            upsert: true,
          },
        });

        bulkContractorStats.push({
          updateOne: {
            filter: {
              contractorId,
              delivererId,
              year,
              "monthlyData.month": month,
            },
            update: {
              $inc: {
                yearlyJobs: 1,
                "monthlyData.$.totalMileage": distance,
                "monthlyData.$.totalRevenue": cost,
                "monthlyData.$.totalJobs": 1,
              },

              arrayFilters: [{ "elem.month": month }],
            },
          },
        });

        bulkContractorStats.push({
          updateOne: {
            filter: {
              contractorId,
              delivererId,
              year,
              "monthlyData.month": { $ne: month },
            },
            update: {
              $push: {
                monthlyData: {
                  $each: [
                    {
                      month,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { month: -1 },
                },
              },
            },
          },
        });
        //Updating the daily data and soring
        bulkContractorStats.push({
          updateOne: {
            filter: { contractorId, delivererId, year, "dailyData.date": date },
            update: {
              $inc: {
                "dailyData.$.totalMileage": distance,
                "dailyData.$.totalRevenue": cost,
                "dailyData.$.totalJobs": 1,
              },
            },
          },
        });

        bulkContractorStats.push({
          updateOne: {
            filter: {
              contractorId,
              delivererId,
              year,
              "dailyData.date": { $ne: date },
            },
            update: {
              $push: {
                dailyData: {
                  $each: [
                    {
                      date,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { date: -1 },
                },
              },
            },
          },
        });

        //END OF THE CONTRACTORSTATS UPDATING

        //START OF THE OVERALLSTATS UPDATING

        bulkOverallStats.push({
          updateOne: {
            filter: { companyId, year },
            update: {
              $inc: {
                yearlyMileage: distance,
                yearlyRevenue: cost,
                yearlyProfit: cost,
                yearlyExpenses: 0,
                [`revenueByContractor.${contractorName}`]: cost,
                [`jobsByContractor.${contractorName}`]: 1,
                // yearlyJobs: 1, // Increment yearlyJobs by 1
              },
              $setOnInsert: {
                monthlyData: [],
                dailyData: [],
                yearlyJobs: 1,
                totalCustomers: totalCustomers,
              },
            },
            upsert: true,
          },
        });

        bulkOverallStats.push({
          updateOne: {
            filter: { companyId, year, "monthlyData.month": month },
            update: {
              $inc: {
                yearlyJobs: 1,

                "monthlyData.$.totalMileage": distance,
                "monthlyData.$.totalRevenue": cost,
                "monthlyData.$.totalProfit": cost,
                "monthlyData.$.totalExpenses": 0,
                "monthlyData.$.totalJobs": 1,
              },

              arrayFilters: [{ "elem.month": month }],
            },
          },
        });

        bulkOverallStats.push({
          updateOne: {
            filter: { companyId, year, "monthlyData.month": { $ne: month } },
            update: {
              $push: {
                monthlyData: {
                  $each: [
                    {
                      month,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalProfit: cost,
                      totalExpenses: 0,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { month: -1 },
                },
              },
            },
          },
        });
        //Updating the daily data and soring
        bulkOverallStats.push({
          updateOne: {
            filter: { companyId, year, "dailyData.date": date },
            update: {
              $inc: {
                "dailyData.$.totalMileage": distance,
                "dailyData.$.totalRevenue": cost,
                "dailyData.$.totalJobs": 1,
              },
            },
          },
        });

        bulkOverallStats.push({
          updateOne: {
            filter: {
              companyId,
              year,
              "dailyData.date": { $ne: date },
            },
            update: {
              $push: {
                dailyData: {
                  $each: [
                    {
                      date,
                      totalMileage: distance,
                      totalRevenue: cost,
                      totalJobs: 1,
                    },
                  ],
                  $sort: { date: -1 },
                },
              },
            },
          },
        });

        //END OF THE DRIVERSTATS UPDATING

        await newJob.save();

        const jobId = newJob._id;
        jobIds.push(jobId);
      }
      //checking the deliverer table

      // Perform bulk operations for DriverStats, VehicleStats, and OverallStats
      await DriverStats.bulkWrite(bulkDriverStats);
      await VehicleStats.bulkWrite(bulkVehicleStats);
      await OverallStats.bulkWrite(bulkOverallStats);
      await ContractorStats.bulkWrite(bulkContractorStats);

      await OverallStats.updateOne(
        { companyId, year },
        {
          $set: {
            totalCustomers: totalCustomers,
            totalContractors: totalContractors,
          },
        },
        {}
      );

      await Contractor.updateOne(
        { _id: contractorId },
        { $inc: { lastOrder: 1 } }
      );

      await deliverer.job_ids.push(...jobIds);
      await driver.job_ids.push(...jobIds);
      await vehicle.job_ids.push(...jobIds);
      await contractor.job_ids.push(...jobIds);

      await driver.save();
      await vehicle.save();
      await deliverer.save();
      await contractor.save();

      const vehStats = await VehicleStats.findOne({ vehicleId: vehicleId });
      const drStats = await DriverStats.findOne({ driverId: driverId });
      const ovStats = await OverallStats.findOne({ companyId: companyId });

      // Sort the monthlyData array by month in ascending order
      drStats.monthlyData.sort(
        (a, b) =>
          new Date(Date.parse(`01 ${a.month} 2000`)) -
          new Date(Date.parse(`01 ${b.month} 2000`))
      );
      // Sort the dailyData array by date in ascending order
      // the a.date is date is the name of he field in the dailyData
      drStats.dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));

      await drStats.save();

      // Sort the monthlyData array by month in ascending order
      vehStats.monthlyData.sort(
        (a, b) =>
          new Date(Date.parse(`01 ${a.month} 2000`)) -
          new Date(Date.parse(`01 ${b.month} 2000`))
      );
      // Sort the dailyData array by date in ascending order
      // the a.date is date is the name of he field in the dailyData
      vehStats.dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Save the sorted dailyData array
      await vehStats.save();

      // Sort the monthlyData array by month in ascending order
      ovStats.monthlyData.sort(
        (a, b) =>
          new Date(Date.parse(`01 ${a.month} 2000`)) -
          new Date(Date.parse(`01 ${b.month} 2000`))
      );
      // Sort the dailyData array by date in ascending order
      // the a.date is date is the name of he field in the dailyData
      ovStats.dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Save the sorted dailyData array
      await ovStats.save();

      // Update driver and vehicle collections

      const contrStats = await ContractorStats.find({
        contractorId: contractorId,
        delivererId: companyId,
      });
      if (!contrStats) {
        return next(new ErrorHandler("Contractor not found", 400));
      }
      console.log(contrStats[0].year);
      await contrStats[0].job_ids.push(...jobIds);
      await contrStats[0].save();
      // ...

      res.status(201).json({
        success: true,
        message: "Jobs added successfully",
        jobs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update job info
router.put(
  "/update-job",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        jobId,
        jobNum,
        fromId,
        pageCustomerId,
        description,
        vehicleId,
        contractorId,
        driverId,
        mileageIn,
        mileageOut,
        deliveryType,
        cost,
        distance,
        orderDatee,
      } = req.body;

      console.log(orderDatee);

      const job = await Job.findById(jobId);

      if (!job) {
        return next(new ErrorHandler("Job not found", 400));
      }
      if (!jobId) {
        return next(new ErrorHandler("Job Id is required"));
      }

      console.log(orderDatee, "date here");

      try {
        job.jobNumber = jobNum;
        job.from = fromId;
        job.customer = pageCustomerId;
        job.distance = distance;
        job.cost = cost;
        job.mileageIn = mileageIn;
        job.mileageOut = mileageOut;
        job.orderDate = orderDatee;
        job.description = description;
        job.deliveryType = deliveryType;
        job.contractorId = contractorId;
        job.driverId = driverId;
        job.vehicleId = vehicleId;

        await job.save();
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//deleting the job
router.delete(
  "/delete-job/:jobId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const jobId = req.params.jobId;
      const { vehId, drId, contrId } = req.body;

      const job = await Job.findByIdAndDelete(jobId);
      if (!job) {
        return next(new ErrorHandler("There is no job with this id", 500));
      }
      const deliverer = await Deliverer.findById(req.user.companyId);
      if (!deliverer) {
        return next(
          new ErrorHandler("There is no deliverer with this id", 500)
        );
      }
      const driver = await Driver.findById(drId);

      if (!driver) {
        return next(new ErrorHandler("Driver not found", 500));
      }
      const vehicle = await Vehicle.findById(vehId);
      if (!vehicle) {
        return next(new ErrorHandler("Driver not found ", 500));
      }

      const contractor = await Contractor.findById(contrId);
      if (!contractor) {
        return next(new ErrorHandler("Contractor not found ", 500));
      }

      // Remove the jobId from the deliverer's array of jobIds
      const updatedJobIds = deliverer.job_ids.filter(
        (id) => id.toString() !== jobId
      );

      // Update the deliverer's jobIds array with the updated array
      deliverer.job_ids = updatedJobIds;
      // Remove the jobId from the vehicle's array of jobIds
      const updatedJobIdsVeh = vehicle.job_ids.filter(
        (id) => id.toString() !== jobId
      );

      // Update the vehicle's jobIds array with the updated array
      vehicle.job_ids = updatedJobIdsVeh;
      // Remove the jobId from the driver's array of jobIds
      const updatedJobIdsDr = driver.job_ids.filter(
        (id) => id.toString() !== jobId
      );

      // Update the driver's jobIds array with the updated array
      deliverer.job_ids = updatedJobIdsDr;

      // Remove the jobId from the driver's array of jobIds
      const updatedJobIdsContr = contractor.job_ids.filter(
        (id) => id.toString() !== jobId
      );

      // Update the driver's jobIds array with the updated array
      contractor.job_ids = updatedJobIdsContr;

      await vehicle.save();
      await driver.save();
      await contractor.save();
      await deliverer.save();

      res.status(201).json({
        success: true,
        message: "Job Deleted!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//getting all the jobs for the JobsPage.jsx
router.get(
  "/get-all-jobs-page",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let {
        page = 0,
        pageSize = 25,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: -1 };

      // Find the deliverer based on the company ID
      const deliverer = await Deliverer.findById(req.user.companyId);
      if (!deliverer) {
        return res.status(404).json({
          success: false,
          message: "Deliverer not found",
        });
      }

      console.log(deliverer);
      // Get the customer IDs associated with the deliverer
      const jobIds = deliverer.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },
              { jobNumber: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        { $sort: { orderDate: -1 } }, // Sort by orderDate in descending order

        { $skip: page * parseInt(pageSize, 10) },

        { $limit: parseInt(pageSize, 10) },
        { $sort: sortOptions },
      ];
      // Execute the aggregation pipeline
      const pageJobs = await Job.aggregate(pipeline);
      if (pageJobs.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      console.log(pageJobs);
      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        pageJobs,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the latest jobs for the vdeliverer
router.get(
  "/get-latest-jobs-deliverer",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      //console.log(vehicleId, "show")
      //const { vehicleId } = req.body;
      let {
        page = 1,
        pageSize = 25,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: -1 };

      // Find the deliverer based on the company ID
      const deliverer = await Deliverer.findById(req.user.companyId);
      if (!deliverer) {
        return res.status(404).json({
          success: false,
          message: "Deliverer not found",
        });
      }

      // Get the job IDs associated with the deliverer
      const jobIds = deliverer.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        { $sort: { orderDate: -1 } }, // Sort by orderDate in descending order
        { $limit: 5 }, // Limit the results to 5 jobs
        { $sort: sortOptions }, // Apply the requested sort options
      ];

      // Execute the aggregation pipeline
      const latestDelivererJobs = await Job.aggregate(pipeline);
      if (latestDelivererJobs.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        latestDelivererJobs,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the latest jobs for the contractor
router.get(
  "/get-latest-jobs-contractor/:contractorId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const contractorId = req.params.contractorId;

      let {
        page = 1,
        pageSize = 20,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: -1 };

      // Find the deliverer based on the company ID

      const getContractorStats = await ContractorStats.find({
        contractorId: contractorId,
        delivererId: req.user.companyId,
      });

      if (!getContractorStats) {
        return res.status(404).json({
          success: false,
          message: "Contractor Stats not found",
        });
      }

      // Get the job IDs associated with the deliverer
      const jobIds = getContractorStats[0].job_ids;

      if (!jobIds.length === 0) {
        res.status(201).json({
          success: false,
          message: "No Jobs for Contractor",
        });
      }
      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        { $sort: { orderDate: -1 } }, // Sort by orderDate in descending order
        { $limit: 5 }, // Limit the results to 5 jobs
        { $sort: sortOptions }, // Apply the requested sort options
      ];

      // Execute the aggregation pipeline
      const latestContractorJobs = await Job.aggregate(pipeline);
      if (latestContractorJobs.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        latestContractorJobs,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the latest jobs for the vehicle
router.get(
  "/get-latest-jobs-vehicle/:vehicleId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const vehicleId = req.params.vehicleId;
      //console.log(vehicleId, "show")
      //const { vehicleId } = req.body;
      let {
        page = 1,
        pageSize = 20,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: -1 };

      // Find the deliverer based on the company ID
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      // Get the customer IDs associated with the deliverer
      const jobIds = vehicle.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        { $sort: { orderDate: -1 } }, // Sort by orderDate in descending order
        { $limit: 5 }, // Limit the results to 5 jobs
        { $sort: sortOptions }, // Apply the requested sort options
      ];

      // Execute the aggregation pipeline
      const latestVehicleJobs = await Job.aggregate(pipeline);
      if (latestVehicleJobs.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        latestVehicleJobs,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the latest jobs for the driver
router.get(
  "/get-latest-jobs-driver/:driverId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const driverId = req.params.driverId;
      //console.log(vehicleId, "show")
      //const { vehicleId } = req.body;
      let {
        page = 1,
        pageSize = 20,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: -1 };

      // Find the deliverer based on the company ID
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }

      // Get the customer IDs associated with the deliverer
      const jobIds = driver.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        { $sort: { orderDate: -1 } }, // Sort by orderDate in descending order
        { $limit: 5 }, // Limit the results to 5 jobs
        { $sort: sortOptions }, // Apply the requested sort options
      ];

      // Execute the aggregation pipeline
      const latestDriverJobs = await Job.aggregate(pipeline);

      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });
      if (!latestDriverJobs) {
        return res.status(200).json({
          success: false,
          message: "No jobs in the system for this driver",
        });
      } else {
        res.status(200).json({
          success: true,
          latestDriverJobs,
          totalCount,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the jobs for the reports processing deliverer
router.get(
  "/get-all-jobsReport-deliverer",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let {
        page = 0,
        pageSize = 25,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: 1 };

      // Find the deliverer based on the company ID
      const deliverer = await Deliverer.findById(req.user.companyId);
      if (!deliverer) {
        return res.status(404).json({
          success: false,
          message: "Deliverer not found",
        });
      }

      console.log(deliverer);
      // Get the customer IDs associated with the deliverer
      const jobIds = deliverer.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },
              { jobNumber: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        // { $sort: { orderDate: 1 } }, // Sort by orderDate in descending order

        { $sort: sortOptions },
      ];
      // Execute the aggregation pipeline
      const delivererWithJobsReport = await Job.aggregate(pipeline);
      if (delivererWithJobsReport.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      console.log(delivererWithJobsReport);
      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        delivererWithJobsReport,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the jobs for the reports processing contractor
router.get(
  "/get-all-jobsReport-contractor/:contractorId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const contractorId = req.params.contractorId;
      console.log(contractorId);
      let {
        //page = 0,
        //pageSize = 25,
        //searcha = "",
        jobSearch = "",

        sort = null,
        //sorta = null,
        //sortField = "_id",
        //sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: 1 };

      // Find the deliverer based on the company ID
      const contractor = await Contractor.findById(contractorId);
      if (!contractor) {
        return res.status(404).json({
          success: false,
          message: "Contractor not found",
        });
      }

      //  console.log(contractor);
      // Get the customer IDs associated with the contractor
      const jobIds = contractor.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },
              { jobNumber: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        // { $sort: { orderDate: 1 } }, // Sort by orderDate in descending order

        { $sort: sortOptions },
      ];
      // Execute the aggregation pipeline
      const contractorWithJobsReport = await Job.aggregate(pipeline);
      if (contractorWithJobsReport.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      console.log(contractorWithJobsReport);

      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        contractorWithJobsReport,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the jobs for the reports processing --driver
router.get(
  "/get-all-jobsReport-driver/:driverId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const  driverId  = req.params.driverId;
      console.log(driverId);
      let {
        page = 0,
        pageSize = 25,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: 1 };

      // Find the deliverer based on the company ID
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Driver not found",
        });
      }

      console.log(driver);
      // Get the customer IDs associated with the driver
      const jobIds = driver.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },
              { jobNumber: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        // { $sort: { orderDate: 1 } }, // Sort by orderDate in descending order

        { $sort: sortOptions },
      ];
      // Execute the aggregation pipeline
      const driverWithJobsReport = await Job.aggregate(pipeline);
      if (driverWithJobsReport.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      console.log(driverWithJobsReport);
      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        driverWithJobsReport,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//getting the jobs for the reports processing --vehicle
router.get(
  "/get-all-jobsReport-vehicle/:vehicleId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const vehicleId = req.params.vehicleId;
      
      let {
        page = 0,
        pageSize = 25,
        searcha = "",
        jobSearch = "",
        contractor,
        sort = null,
        sorta = null,
        sortField = "_id",
        sortOrder = "desc",
      } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortOptions = {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };

        return sortOptions;
      };

      // Formatted sort should look like { field: 1 } or { field: -1 }
      const sortOptions = Boolean(sort) ? generateSort() : { orderDate: 1 };

      // Find the vehicle based on the company ID
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      console.log(vehicle);
      // Get the customer IDs associated with the vehicle
      const jobIds = vehicle.job_ids;

      // Update the pipeline with the revised $match stage
      const pipeline = [
        { $match: { _id: { $in: jobIds } } },
        {
          $lookup: {
            from: "customers",
            localField: "customer",
            foreignField: "_id",
            as: "customer",
          },
        },
        { $unwind: "$customer" },
        {
          $lookup: {
            from: "customers",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $unwind: "$from" },
        {
          $lookup: {
            from: "contractors",
            let: { contractorId: "$contractorId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$contractorId"] } } },
              { $project: { companyName: 1 } },
            ],
            as: "contractorId",
          },
        },
        { $unwind: "$contractorId" },
        {
          $match: {
            $or: [
              // Add your alternative search conditions here
              {
                "customer.name": { $regex: `.*${jobSearch}.*`, $options: "i" },
              }, // Example: search in field1 using regex
              { "from.name": { $regex: `.*${jobSearch}.*`, $options: "i" } },
              {
                "contractorId.companyName": {
                  $regex: `.*${jobSearch}.*`,
                  $options: "i",
                },
              },
              { deliveryType: { $regex: `.*${jobSearch}.*`, $options: "i" } },
              { jobNumber: { $regex: `.*${jobSearch}.*`, $options: "i" } },

              // Add more conditions as needed
            ],
          },
        },
        // { $sort: { orderDate: 1 } }, // Sort by orderDate in descending order

        { $sort: sortOptions },
      ];
      // Execute the aggregation pipeline
      const vehicleWithJobsReport = await Job.aggregate(pipeline);
      if (vehicleWithJobsReport.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No jobs in the system",
        });
      }

      console.log(vehicleWithJobsReport);
      // Get the total count of jobs
      const totalCount = await Job.countDocuments({
        _id: { $in: jobIds },
      });

      res.status(200).json({
        success: true,
        vehicleWithJobsReport,
        totalCount,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
